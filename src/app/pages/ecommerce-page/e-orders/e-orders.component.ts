import {
    Component,
    ViewChild,
    OnInit,
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
import { OrderService } from '../../../services/order.service';
import { OrderDTO } from '../../../shared/DTOs/OrderModel';
import { AuthService } from '../../../services/auth.service';
import { catchError, takeUntil, switchMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { NgClass, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
    selector: 'app-e-orders',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatTableModule,
        NgIf,
        NgClass,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        ReactiveFormsModule,
        CurrencyPipe,
        DatePipe,
    ],
    templateUrl: './e-orders.component.html',
    styleUrls: ['./e-orders.component.scss'],
})
export class EOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns: string[] = [
        'orderid',
        'ordername',
        'orderprice',
        'orderstatus',
        'createddate',
        'action',
    ];
    dataSource = new MatTableDataSource<OrderDTO>();
    isToggled = false;
    sortField = 'orderid';
    sortDirection: 'asc' | 'desc' = 'asc';
    totalItems: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public themeService: CustomizerSettingsService,
        private orderService: OrderService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.setupThemeToggle();
        this.checkAuthAndLoadOrders();
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

    private setupDataSource(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (
            item: OrderDTO,
            property: string
        ): string | number => {
            switch (property) {
                case 'orderid':
                    return Number(item.orderid);
                case 'ordername':
                    return item.ordername;
                case 'orderprice':
                    return Number(item.orderprice);
                case 'orderstatus':
                    return item.orderstatus;
                case 'createddate':
                    return new Date(item.createddate).getTime();
                default:
                    return '';
            }
        };
    }

    private checkAuthAndLoadOrders(): void {
        this.authService.token$
            .pipe(
                takeUntil(this.unsubscribe$),
                switchMap((token) => {
                    if (!token) {
                        return throwError(() => new Error('No authentication token available'));
                    }
                    return of(token);
                }),
                catchError((error) => {
                    if (error.status === 401) {
                        return this.handleUnauthorizedError();
                    }
                    return throwError(() => error);
                })
            )
            .subscribe({
                next: () => this.loadOrders(1, 10),
                error: this.handleLoadOrdersError.bind(this),
            });
    }

    private handleUnauthorizedError() {
        return this.authService.refreshToken().pipe(
            switchMap(() => {
                return this.orderService.getOrders({
                    page: 1,
                    limit: 10,
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

    private handleLoadOrdersSuccess(response: any) {
        console.log('API response:', response);
        this.dataSource.data = response.orders;
        this.totalItems = response.totalItems;
    }

    private handleLoadOrdersError(error: any) {
        console.error('Error loading orders:', error);
        if (error.status === 401) {
            this.router.navigate(['/authentication/sign-in']);
        } else {
            this.showErrorAlert('Failed to load orders');
        }
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteOrder(id: number): void {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณไม่สามารถย้อนกลับการกระทำนี้ได้!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#001EE0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'กเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                this.performDeleteOrder(id);
            }
        });
    }

    private performDeleteOrder(id: number): void {
        this.orderService
            .deleteOrder(id)
            .pipe(catchError(this.handleDeleteOrderError.bind(this, id)))
            .subscribe({
                next: this.handleDeleteOrderSuccess.bind(this),
                error: this.handleDeleteOrderError.bind(this, id),
            });
    }

    private handleDeleteOrderError(error: any, id: number) {
        console.error('Error deleting order:', error);
        if (error.status === 401) {
            return this.authService
                .refreshToken()
                .pipe(switchMap(() => this.orderService.deleteOrder(id)));
        }
        return throwError(() => error);
    }

    private handleDeleteOrderSuccess() {
        Swal.fire('ลบแล้ว!', 'คำสั่งซื้อถูกลบเรียบร้อยแล้ว', 'success');
        this.checkAuthAndLoadOrders();
    }

    sortData(sort: Sort): void {
        this.sortField = sort.active || 'orderid';
        this.sortDirection = sort.direction || 'asc';

        if (this.dataSource.data) {
            this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                    case 'orderid': return this.compare(a.orderid, b.orderid, isAsc);
                    case 'ordername': return this.compare(a.ordername, b.ordername, isAsc);
                    case 'orderprice': return this.compare(a.orderprice, b.orderprice, isAsc);
                    case 'orderstatus': return this.compare(a.orderstatus, b.orderstatus, isAsc);
                    case 'createddate': return this.compare(new Date(a.createddate), new Date(b.createddate), isAsc);
                    default: return 0;
                }
            });
        }
    }

    private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    showErrorAlert(message: string) {
        Swal.fire('Error', message, 'error');
    }

    showSuccessAlert(message: string) {
        Swal.fire('Success', message, 'success');
    }

    onPageChange(event: PageEvent): void {
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;
        this.sortField = this.sort.active || 'orderid';
        this.sortDirection = this.sort.direction || 'asc';
        this.checkAuthAndLoadOrders();
        if (this.dataSource.data) {
            this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
                const isAsc = this.sortDirection === 'asc';
                switch (this.sortField) {
                    case 'orderid': return this.compare(a.orderid, b.orderid, isAsc);
                    case 'ordername': return this.compare(a.ordername, b.ordername, isAsc);
                    case 'orderprice': return this.compare(a.orderprice, b.orderprice, isAsc);
                    case 'orderstatus': return this.compare(a.orderstatus, b.orderstatus, isAsc);
                    case 'createddate': return this.compare(new Date(a.createddate), new Date(b.createddate), isAsc);
                    default: return 0;
                }
            });
        }
    }

    private loadOrders(pageIndex: number, pageSize: number): void {
        this.orderService
            .getOrders({
                page: pageIndex,
                limit: pageSize,
                sortField: this.sortField,
                sortDirection: this.sortDirection,
            })
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (response) => {
                    this.dataSource.data = response.orders.sort((a, b) =>
                        this.compare(Number(a.orderid), Number(b.orderid), this.sortDirection === 'asc')
                    );
                    this.totalItems = response.total;
                },
                error: (error) => {
                    console.error('Error loading orders:', error);
                    this.showErrorAlert('Failed to load orders');
                },
            });
    }

    getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'text-outline-success';
            case 'pending':
                return 'text-outline-warning';
            case 'cancelled':
                return 'text-outline-danger';
            default:
                return 'text-outline-secondary';
        }
    }
}
