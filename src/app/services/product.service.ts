import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { ProductDto, ProductResponse } from '../shared/DTOs/ProductModel';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CloudinaryService } from './cloudinary.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiUrl = environment.apiBaseUrl + '/product';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private cloudinaryService: CloudinaryService
    ) {}

    getProducts(
        options: ProductQueryOptions = {}
    ): Observable<ProductResponse> {
        const reqUrl = this.buildProductsUrl(options);
        return this.http.get<ProductResponse>(reqUrl, this.getHttpOptions());
    }

    getProduct(id: number): Observable<ProductDto> {
        return this.http.get<ProductDto>(
            this.apiUrl + '/' + id,
            this.getHttpOptions()
        );
    }

    createProduct(product: ProductDto, image: File): Observable<ProductDto> {
        const formData = new FormData();
        formData.append('image', image, image.name);
        for (const key in product) {
            if (product.hasOwnProperty(key)) {
                formData.append(
                    key,
                    product[key as keyof ProductDto] as string | Blob
                );
            }
        }
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );
        return this.http.post<ProductDto>(this.apiUrl, formData, { headers });
    }

    updateProduct(
        id: number,
        product: Partial<ProductDto>,
        image?: File
    ): Observable<ProductDto> {
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            if (product[key as keyof ProductDto] !== undefined) {
                formData.append(
                    key,
                    product[key as keyof ProductDto] as string | Blob
                );
            }
        });
        if (image) {
            formData.append('image', image, image.name);
        }
        return this.http.put<ProductDto>(
            this.apiUrl + '/' + id,
            formData,
            this.getHttpOptions()
        );
    }

    deleteProduct(id: number): Observable<unknown> {
        return this.http
            .delete(this.apiUrl + '/' + id, this.getHttpOptions())
            .pipe(
                switchMap(() => {
                    return of(null);
                }),
                catchError((error) => {
                    console.error('Error deleting product:', error);
                    return throwError(
                        () => new Error('Failed to delete product')
                    );
                })
            );
    }

    uploadProductImage(productId: number, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image, image.name);
        return this.http.post(
            `${this.apiUrl}/${productId}/upload-image`,
            formData,
            this.getHttpOptions()
        );
    }

    private buildProductsUrl(options: ProductQueryOptions): string {
        const {
            page = 1,
            limit = 10,
            searchQuery,
            selectedCategory,
            sortField = 'productid',
            sortDirection = 'asc',
            createdAtSort = 'desc',
        } = options;

        let url = this.apiUrl + '?';

        url += `page=${page}&`;
        url += `limit=${limit}&`;
        if (searchQuery) {
            url += `searchQuery=${encodeURIComponent(searchQuery)}&`;
        }
        if (selectedCategory) {
            url += `selectedCategory=${selectedCategory}&`;
        }
        url += `sortField=${sortField}&sortDirection=${sortDirection}&`;
        url += `createdAtSort=${createdAtSort}&`;

        // Remove trailing '&' if exists
        return url.endsWith('&') ? url.slice(0, -1) : url;
    }

    private getHttpOptions(): { headers: HttpHeaders } {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        };
    }

    private createFormData(product: ProductDto, image?: File): FormData {
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            formData.append(
                key,
                product[key as keyof ProductDto] as string | Blob
            );
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
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    searchQuery?: string;
    selectedCategory?: number;
    createdAtSort?: 'asc' | 'desc';
}
