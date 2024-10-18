import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProductService } from '../../../services/product.service';
import { ProductDto } from '../../../shared/DTOs/ProductModel';
import { AuthService } from '../../../services/auth.service';
import { catchError, takeUntil, switchMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
    ],
    templateUrl: './e-products-list.component.html',
    styleUrls: ['./e-products-list.component.scss'],
})
export class EProductsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'productid',
        'productpicture',
        'productname',
        'categoryid',
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (
            item: ProductDto,
            property: string
        ): string | number => {
            switch (property) {
                case 'productid':
                    return this.dataSource.data.indexOf(item) + 1; // ใช้ index แทน productid สำหรับการเรียงลำดับ
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

    loadProducts(): void {
        console.log('loadProducts called');
        this.productService
            .getProducts({
                sortField: this.sortField,
                sortDirection: this.sortDirection,
            })
            .pipe(
                catchError((error) => {
                    console.error('Error fetching products:', error);
                    if (error.status === 401) {
                        // Token might be expired, try to refresh
                        return this.authService.refreshToken().pipe(
                            switchMap(() => {
                                // Retry the original request after token refresh
                                return this.productService.getProducts({
                                    sortField: this.sortField,
                                    sortDirection: this.sortDirection,
                                });
                            }),
                            catchError((refreshError) => {
                                console.error(
                                    'Error refreshing token:',
                                    refreshError
                                );
                                this.router.navigate([
                                    '/authentication/sign-in',
                                ]);
                                return throwError(
                                    () => new Error('Failed to refresh token')
                                );
                            })
                        );
                    }
                    return throwError(
                        () => new Error('Failed to load products')
                    );
                })
            )
            .subscribe((response) => {
                console.log('API response:', response);
                this.dataSource.data = response.products.sort(
                    (a, b) => (a.productid ?? 0) - (b.productid ?? 0)
                );
            });
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
                this.productService.deleteProduct(id).pipe(
                    catchError((error) => {
                        console.error('Error deleting product:', error);
                        if (error.status === 401) {
                            // Token might be expired, try to refresh
                            return this.authService.refreshToken().pipe(
                                switchMap(() => {
                                    // Retry the delete request after token refresh
                                    return this.productService.deleteProduct(id);
                                })
                            );
                        }
                        return throwError(() => error);
                    })
                ).subscribe({
                    next: () => {
                        Swal.fire(
                            'ลบแล้ว!',
                            'สินค้าถูกลบเรียบร้อยแล้ว',
                            'success'
                        );
                        this.loadProducts();
                    },
                    error: (error) => {
                        console.error('Error deleting product:', error);
                        Swal.fire(
                            'เกิดข้อผิดพลาด!',
                            'ไม่สามารถลบสินค้าได้',
                            'error'
                        );
                    },
                });
            }
        });
    }

    sortData(sort: Sort): void {
        if (!sort.active || sort.direction === '') {
            this.sortField = 'productid';
            this.sortDirection = 'asc';
        } else {
            this.sortField = sort.active;
            this.sortDirection = sort.direction as 'asc' | 'desc';
        }
        this.loadProducts();
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
