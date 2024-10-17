import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { ProductDto, ProductResponse } from '../shared/DTOs/ProductModel';
import { environment } from '../../environments/environment';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly apiUrl = `${environment.apiBaseUrl}/Product`;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private cloudinaryService: CloudinaryService
    ) {}

    getProducts(options: ProductQueryOptions = {}): Observable<ProductResponse> {
        const {
            page = 1,
            limit = 100,
            searchQuery,
            selectedCategory,
        } = options;

        // ดึง Token จาก AuthService
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        if (searchQuery) {
            params = params.set('searchQuery', searchQuery);
        }

        if (selectedCategory) {
            params = params.set('selectedCategory', selectedCategory.toString());
        }

        // เพิ่ม headers ในการเรียก API
        return this.http
            .get<ProductResponse>(this.apiUrl, { params, headers })
            .pipe(catchError(this.handleError));
    }


    getProduct(id: number): Observable<ProductDto> {
        return this.http
            .get<ProductDto>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    createProduct(product: ProductDto, image: File): Observable<ProductDto> {
        return this.cloudinaryService.uploadImage(image).pipe(
            switchMap((response) => {
                product.productpicture = response.secure_url;
                return this.http.post<ProductDto>(this.apiUrl, product);
            }),
            catchError(this.handleError)
        );
    }

    updateProduct(
        id: number,
        product: ProductDto,
        image?: File
    ): Observable<ProductDto> {
        if (image) {
            return this.cloudinaryService.uploadImage(image).pipe(
                switchMap((response) => {
                    product.productpicture = response.secure_url;
                    return this.http.put<ProductDto>(
                        `${this.apiUrl}/${id}`,
                        product
                    );
                }),
                catchError(this.handleError)
            );
        } else {
            return this.http
                .put<ProductDto>(`${this.apiUrl}/${id}`, product)
                .pipe(catchError(this.handleError));
        }
    }

    deleteProduct(id: number): Observable<ProductDto> {
        return this.http
            .delete<ProductDto>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    uploadProductImage(productId: number, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image, image.name);
        return this.http
            .post(`${this.apiUrl}/${productId}/upload-image`, formData)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(
            () => new Error('Something bad happened; please try again later.')
        );
    }
}
interface ProductQueryOptions {
    page?: number;
    limit?: number;
    searchQuery?: string;
    selectedCategory?: number;
}
