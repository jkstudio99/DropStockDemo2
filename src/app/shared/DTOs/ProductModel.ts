export interface ProductDto {
    productid?: number;
    productname: string;
    unitprice: number;
    unitinstock: number;
    categoryid: number;
    productpicture?: string;
    createddate?: Date;
    modifieddate?: Date;
}

export interface ProductResponse {
    total: number;
    products: ProductDto[];
}
