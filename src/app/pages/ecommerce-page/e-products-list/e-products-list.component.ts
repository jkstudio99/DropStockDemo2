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
        'categoryname', // Change this from 'categoryid' to 'categoryname'
        'unitprice',
        'unitinstock',
        'action',
    ];
    dataSource = new MatTableDataSource<ProductDto>();
    isToggled = false;
    sortField = 'productid';
    sortDirection: 'asc' | 'desc' = 'asc';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public themeService: CustomizerSettingsService,
        private productService: ProductService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.setupThemeToggle();
        this.checkAuthAndLoadProducts();
    }

    ngAfterViewInit(): void {
        this.setupDataSource();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private setupThemeToggle(): void {
        this.themeService.isToggled$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((isToggled) => {
                this.isToggled = isToggled;
            });
    }

    private checkAuthAndLoadProducts(): void {
        if (this.authService.isAuthenticated()) {
            this.loadProducts();
        } else {
            this.router.navigate(['/authentication/sign-in']);
        }
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
                case 'categoryname':
                    return item.categoryname;
                case 'unitprice':
                    return item.unitprice;
                case 'unitinstock':
                    return item.unitinstock;
                default:
                    return '';
            }
        };
    }

    loadProducts(): void {
        this.productService
            .getProducts({
                sortField: this.sortField,
                sortDirection: this.sortDirection,
            })
            .pipe(catchError(this.handleLoadProductsError.bind(this)))
            .subscribe(this.handleLoadProductsSuccess.bind(this));
    }

    private handleLoadProductsError(error: any) {
        console.error('Error loading products:', error);
        if (error.status === 401) {
            return this.handleUnauthorizedError();
        }
        return throwError(() => new Error('Failed to load products'));
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
            text: 'คุณไม่สามารถย้อนกลับการกระทำนี้ได้!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#001EE0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                this.performDeleteProduct(id);
            }
        });
    }

    private performDeleteProduct(id: number): void {
        this.productService
            .deleteProduct(id)
            .pipe(catchError(this.handleDeleteProductError.bind(this, id)))
            .subscribe({
                next: this.handleDeleteProductSuccess.bind(this),
                error: this.handleDeleteProductError.bind(this, id),
            });
    }

    private handleDeleteProductError(error: any, id: number) {
        console.error('Error deleting product:', error);
        if (error.status === 401) {
            return this.authService
                .refreshToken()
                .pipe(switchMap(() => this.productService.deleteProduct(id)));
        }
        return throwError(() => error);
    }

    private handleDeleteProductSuccess() {
        Swal.fire('ลบแล้ว!', 'สินค้าถูกลบเรียบร้���ยแล้ว', 'success');
        this.loadProducts();
    }

    sortData(sort: Sort): void {
        this.sortField = sort.active || 'productid';
        this.sortDirection = sort.direction || 'asc';

        if (this.dataSource.data) {
            this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                    case 'productid': return this.compare(Number(a.productid), Number(b.productid), isAsc);
                    case 'productname': return this.compare(a.productname, b.productname, isAsc);
                    case 'categoryname': return this.compare(a.categoryname, b.categoryname, isAsc); // Add this line
                    case 'unitprice': return this.compare(Number(a.unitprice), Number(b.unitprice), isAsc);
                    case 'unitinstock': return this.compare(Number(a.unitinstock), Number(b.unitinstock), isAsc);
                    default: return 0;
                }
            });
        }
    }

    private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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

