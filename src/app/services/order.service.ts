import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderDTO } from '../shared/DTOs/OrderModel';
import { OrderCreateDTO } from '../shared/DTOs/OrderCreateModel';
import { OrderUpdateDTO } from '../shared/DTOs/OrderUpdateModel';
import { OrderListResponse } from '../shared/DTOs/OrderListResponse';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiBaseUrl + '/Order';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getOrders(options: OrderQueryOptions = {}): Observable<OrderListResponse> {
        const reqUrl = this.buildOrdersUrl(options);
        return this.http.get<OrderListResponse>(reqUrl, this.getHttpOptions());
    }

    getOrder(id: number): Observable<OrderDTO> {
        return this.http.get<OrderDTO>(this.apiUrl + '/' + id, this.getHttpOptions());
    }

    createOrder(order: OrderCreateDTO): Observable<OrderDTO> {
        return this.http.post<OrderDTO>(this.apiUrl, order, this.getHttpOptions()).pipe(
            catchError(error => {
                console.error('Error creating order:', error);
                return throwError(() => error);
            })
        );
    }

    updateOrder(id: number, order: OrderUpdateDTO): Observable<OrderDTO> {
        return this.http.put<OrderDTO>(`${this.apiUrl}/${id}`, order, this.getHttpOptions()).pipe(
            catchError(error => {
                console.error('Error updating order:', error);
                return throwError(() => error);
            })
        );
    }

    deleteOrder(id: number): Observable<unknown> {
        return this.http.delete(this.apiUrl + '/' + id, this.getHttpOptions());
    }

    private buildOrdersUrl(options: OrderQueryOptions): string {
        const {
            page = 1,
            limit = 10,
            sortField = 'orderid',
            sortDirection = 'asc',
            searchQuery
        } = options;

        let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
        url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
        if (searchQuery) url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
        if (sortField === 'orderid') url += '&sortNumeric=true';
        return url;
    }

    private getHttpOptions(): { headers: HttpHeaders } {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
    }
}

interface OrderQueryOptions {
    page?: number;
    limit?: number;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    searchQuery?: string;
}
