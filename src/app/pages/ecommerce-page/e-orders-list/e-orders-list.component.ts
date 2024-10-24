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
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-e-orders-list',
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
        MatTabsModule,
    ],
    templateUrl: './e-orders-list.component.html',
    styleUrls: ['./e-orders-list.component.scss'],
})
export class EOrdersListComponent implements OnInit, AfterViewInit, OnDestroy {
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
                        return throwError(
                            () => new Error('No authentication token available')
                        );
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
                    sortDirection: this.sortDirection as 'asc' | 'desc',
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
            cancelButtonText: 'ยกเลิก',
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
        this.loadOrders(this.paginator.pageIndex + 1, this.paginator.pageSize);
    }

    private compare(
        a: number | string | Date,
        b: number | string | Date,
        isAsc: boolean
    ): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    private loadOrders(page: number = 1, pageSize: number = 10): void {
        this.orderService
            .getOrders({
                page: page,
                limit: pageSize,
                sortField: this.sortField,
                sortDirection: this.sortDirection as 'asc' | 'desc',
            })
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError((error) => {
                    console.error('Error loading orders:', error);
                    this.showErrorAlert('Failed to load orders');
                    return throwError(() => error);
                })
            )
            .subscribe((response) => {
                this.dataSource.data = response.orders;
                this.totalItems = response.total;
            });
    }

    showErrorAlert(message: string) {
        Swal.fire('Error', message, 'error');
    }

    showSuccessAlert(message: string) {
        Swal.fire('Success', message, 'success');
    }

    onPageChange(event: PageEvent): void {
        this.loadOrders(event.pageIndex + 1, event.pageSize);
    }

    getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'text-bg-success';
            case 'pending':
                return 'text-bg-warning';
            case 'cancelled':
                return 'text-bg-danger';
            default:
                return 'text-bg-secondary';
        }
    }
}
