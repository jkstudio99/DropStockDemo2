export interface ProductDto {
  productid: number;
  productname: string;
  unitprice: number;
  unitinstock: number;
  productpicture: string;
  categoryid: number;
  categoryname: string;
  createddate: Date;
  modifieddate?: Date;
}

export interface ProductResponse {
  total: number;
  products: ProductDto[];
}
