export interface OrderDTO {
    orderid: number;
    ordername: string;
    orderprice: number;
    orderstatus: string;
    orderdetails: string;
    customerid: number;
    createddate: Date;
    modifieddate?: Date;
}
