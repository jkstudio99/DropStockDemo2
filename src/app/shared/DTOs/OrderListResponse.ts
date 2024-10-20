import { OrderDTO } from './OrderModel';

export interface OrderListResponse {
    total: number;
    orders: OrderDTO[];
}
