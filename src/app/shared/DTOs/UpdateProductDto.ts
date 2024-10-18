export interface UpdateProductDto {
  productname: string;
  unitprice: number;
  unitinstock: number;
  categoryid: number;
  productpicture?: string | File;
}
