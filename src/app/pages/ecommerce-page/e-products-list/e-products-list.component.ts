import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
    MatPaginator,
    MatPaginatorModule,
    PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProductService } from '../../../services/product.service';
import { ProductDto } from '../../../shared/DTOs/ProductModel';
import { AuthService } from '../../../services/auth.service';
import { catchError, takeUntil, switchMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { PaginationComponent } from '../../../ui-elements/pagination/pagination.component';
import { CurrencyPipe } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgFor } from '@angular/common';
import { UserRole } from '../../../shared/DTOs/UserRole';

@Component({
    selector: 'app-e-products-list',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        MatTableModule,
        NgIf,
        NgClass,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        PaginationComponent,
        CurrencyPipe,
        NgFor,
    ],
    templateUrl: './e-products-list.component.html',
    styleUrls: ['./e-products-list.component.scss'],
})
export class EProductsListComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    displayedColumns: string[] = [
        'productid',
        'productpicture',
        'productname',
        'categoryid',
        'unitprice',
        'unitinstock',
        'action'
    ];
    dataSource = new MatTableDataSource<ProductDto>();
    isToggled = false;
    sortField = 'productid';
    sortDirection: 'asc' | 'desc' = 'asc';
    totalItems: number = 0;
    categoryMap: Map<number, string> = new Map();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    pageSize: number = 10;
    currentPage: number = 1;
    createdAtSort: 'asc' | 'desc' = 'desc';
    isLoading = false;
    searchQuery = '';
    selectedCategory = '';
    isAdmin: boolean = false;
    isManager: boolean = false;

    private unsubscribe$ = new Subject<void>();
    private destroy$ = new Subject<void>();

    constructor(
        public themeService: CustomizerSettingsService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.setupThemeToggle();
        this.checkAuthAndLoadProducts();
        this.loadCategories();
        this.isAdmin = this.authService.hasRole(UserRole.Admin);
        this.isManager = this.authService.hasRole(UserRole.Manager);
    }

    ngAfterViewInit(): void {
        this.setupDataSource();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setupThemeToggle(): void {
        this.themeService.isToggled$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((isToggled) => {
                this.isToggled = isToggled;
            });
    }

    private checkAuthAndLoadProducts(): void {
        this.authService.isUserAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
                this.loadProducts();
            } else {
                this.router.navigate(['/authentication/sign-in']);
            }
        });
    }

    private setupDataSource(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = this.getSortingDataAccessor();
    }

    private getSortingDataAccessor(): (
        item: ProductDto,
        property: string
    ) => string | number {
        return (item: ProductDto, property: string): string | number => {
            switch (property) {
                case 'productid':
                    return this.dataSource.data.indexOf(item) + 1;
                case 'productname':
                    return item.productname;
                case 'categoryid':
                    return item.categoryid;
                case 'unitprice':
                    return item.unitprice;
                case 'unitinstock':
                    return item.unitinstock;
                default:
                    return '';
            }
        };
    }

    loadProducts(page: number = this.currentPage, pageSize: number = this.pageSize): void {
        this.isLoading = true;
        this.productService
            .getProducts({
                page,
                limit: pageSize,
                sortField: this.sortField,
                sortDirection: this.sortDirection,
                searchQuery: this.searchQuery,
                selectedCategory: Number(this.selectedCategory) || undefined,
                createdAtSort: this.createdAtSort,
            })
            .pipe(
                takeUntil(this.destroy$),
                catchError((error) => this.handleLoadProductsError(error))
            )
            .subscribe({
                next: (response) => {
                    this.dataSource.data = response.products;
                    this.totalItems = response.total;
                    this.currentPage = page;
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error after retry:', error);
                    this.showErrorAlert('Failed to load products after retry');
                    this.isLoading = false;
                },
            });
    }

    private handleLoadProductsError(error: any) {
        console.error('Error loading products:', error);
        if (error.status === 401) {
            return this.handleUnauthorizedError();
        }
        return throwError(() => error);
    }

    private handleUnauthorizedError() {
        return this.authService.refreshToken().pipe(
            switchMap(() => {
                return this.productService.getProducts({
                    sortField: this.sortField,
                    sortDirection: this.sortDirection,
                });
            }),
            catchError((refreshError) => {
                console.error('Error refreshing token:', refreshError);
                this.router.navigate(['/authentication/sign-in']);
                return throwError(() => new Error('Failed to refresh token'));
            })
        );
    }

    private handleLoadProductsSuccess(response: any) {
        console.log('API response:', response);
        this.dataSource.data = response.products.sort(
            (a: ProductDto, b: ProductDto) =>
                (a.productid ?? 0) - (b.productid ?? 0)
        );
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteProduct(id: number): void {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณไม่สามารถย้อนกลับกากระทำนี้ได้!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#001EE0',
            cancelButtonColor: '#FF4023',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก',
            background: '#fff',
            iconColor: '#001EE0',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.productService.deleteProduct(id).subscribe({
                    next: () => this.handleDeleteProductSuccess(),
                    error: (error: any) => {
                        console.error('Error deleting product:', error);
                        this.showErrorAlert('Failed to delete product. Please try again.');
                    }
                });
            }
        });
    }

    private handleDeleteProductSuccess() {
        Swal.fire({
            icon: 'success',
            title: 'ลบแลว!',
            text: 'สินค้าถูกลบเรียบร้อยแล้ว',
            confirmButtonColor: '#001EE0',
            iconColor: '#FF4023'
        });
        this.loadProducts();
    }

    sortData(sort: Sort): void {
        this.sortField = sort.active || 'productid';
        this.sortDirection = sort.direction || 'asc';
        this.loadProducts(1, this.paginator.pageSize);
    }

    private compare(a: number | string, b: number | string, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    showErrorAlert(message: string) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#001EE0',
            iconColor: '#FF4023'
        });
    }

    showSuccessAlert(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            confirmButtonColor: '#001EE0',
            iconColor: '#25B003'
        });
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadProducts(this.currentPage, this.pageSize);
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (categories) => {
                categories.forEach(category => {
                    this.categoryMap.set(category.categoryid, category.categoryname);
                });
            },
            error: (error) => {
                console.error('Error loading categories:', error);
                this.showErrorAlert('Failed to load categories');
            }
        });
    }

    toggleCreatedAtSort(): void {
        this.createdAtSort = this.createdAtSort === 'desc' ? 'asc' : 'desc';
        this.loadProducts(1, this.pageSize);
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export interface SuccessResponse<T = void> {
    status: 'success';
    message: string;
    data: T;
}

export interface ErrorResponse {
    status: 'error' | 'warning';
    message: string;
    errors?: Record<string, string[]>;
}

export type ResponseModel<T = void> = SuccessResponse<T> | ErrorResponse;
