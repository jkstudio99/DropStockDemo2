import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ProductDto, ProductResponse } from '../shared/DTOs/ProductModel';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CloudinaryService } from './cloudinary.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = environment.apiBaseUrl + '/product';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private cloudinaryService: CloudinaryService
    ) {}

    getProducts(options: ProductQueryOptions = {}): Observable<ProductResponse> {
        const reqUrl = this.buildProductsUrl(options);
        return this.http.get<ProductResponse>(reqUrl, this.getHttpOptions());
    }

    getProduct(id: number): Observable<ProductDto> {
        return this.http.get<ProductDto>(this.apiUrl + '/' + id, this.getHttpOptions());
    }

    createProduct(product: ProductDto, image: File): Observable<ProductDto> {
        return this.cloudinaryService.uploadImage(image).pipe(
            switchMap(cloudinaryResponse => {
                if (!cloudinaryResponse.secure_url) {
                    console.error('Cloudinary response:', cloudinaryResponse);
                    throw new Error('Cloudinary did not return a secure URL');
                }
                product.productpicture = cloudinaryResponse.secure_url;
                return this.http.post<ProductDto>(this.apiUrl, product, this.getHttpOptions());
            }),
            catchError(error => {
                console.error('Detailed error in createProduct:', error);
                if (error.error && error.error.message) {
                    return throwError(() => new Error(`Failed to create product: ${error.error.message}`));
                }
                return throwError(() => new Error(`Failed to create product: ${error.message || 'Unknown error'}`));
            })
        );
    }

    updateProduct(id: number, product: ProductDto, image?: File): Observable<ProductDto> {
        if (image) {
            return this.cloudinaryService.uploadImage(image).pipe(
                switchMap(cloudinaryResponse => {
                    product.productpicture = cloudinaryResponse.secure_url;
                    return this.http.put<ProductDto>(this.apiUrl + '/' + id, product, this.getHttpOptions());
                })
            );
        } else {
            return this.http.put<ProductDto>(this.apiUrl + '/' + id, product, this.getHttpOptions());
        }
    }

    deleteProduct(id: number): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${id}`, this.getHttpOptions());
    }

    uploadProductImage(productId: number, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image, image.name);
        return this.http.post(`${this.apiUrl}/${productId}/upload-image`, formData, this.getHttpOptions());
    }

    private buildProductsUrl(options: ProductQueryOptions): string {
        const {
            page = 1,
            limit = 100,
            searchQuery,
            selectedCategory,
            sortField = 'productid',
            sortDirection = 'asc'
        } = options;

        let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
        if (searchQuery) {
            url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
        }
        if (selectedCategory) {
            url += `&selectedCategory=${selectedCategory}`;
        }
        if (sortField && sortDirection) {
            url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
        }
        if (['productid', 'unitprice', 'unitinstock'].includes(sortField)) url += '&sortNumeric=true';

        return url;
    }

    private getHttpOptions(): { headers: HttpHeaders } {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        };
    }

    private createFormData(product: ProductDto, image?: File): FormData {
        const formData = new FormData();
        Object.keys(product).forEach(key => {
            formData.append(key, product[key as keyof ProductDto] as string | Blob);
        });
        if (image) {
            formData.append('image', image, image.name);
        }
        return formData;
    }
}

interface ProductQueryOptions {
    page?: number;
    limit?: number;
    searchQuery?: string;
    selectedCategory?: number;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
}
