import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, Subject, BehaviorSubject } from 'rxjs';
import { ProductDto, ProductResponse } from '../shared/DTOs/ProductModel';
import { environment } from '../../environments/environment';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly apiUrl = `${environment.apiBaseUrl}/Product`;
    private productsSubject = new BehaviorSubject<ProductResponse | null>(null);
    products$ = this.productsSubject.asObservable();

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
            sortField,
            sortDirection
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

        if (sortField && sortDirection) {
            params = params.set('sortField', sortField).set('sortDirection', sortDirection);
        }

        // เพิ่ม headers ในการเรียก API
        return this.http
            .get<ProductResponse>(this.apiUrl, { params, headers })
            .pipe(catchError(this.handleError));
    }


    getProduct(id: number): Observable<ProductDto> {
        return this.authService.token$.pipe(
            switchMap(token => {
                if (!token) {
                    return throwError(() => new Error('No authentication token available'));
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
                return this.http.get<ProductDto>(`${this.apiUrl}/${id}`, { headers })
                    .pipe(catchError(this.handleError));
            })
        );
    }

    createProduct(product: ProductDto, image: File): Observable<ProductDto> {
        const formData = new FormData();
        formData.append('image', image, image.name);
        for (const key in product) {
            if (product.hasOwnProperty(key)) {
                formData.append(key, product[key as keyof ProductDto] as string | Blob);
            }
        }
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<ProductDto>(`${this.apiUrl}`, formData, { headers })
            .pipe(
                catchError((error) => {
                    console.error('Error in createProduct:', error);
                    console.error('Error response:', error.error);
                    return throwError(() => new Error(`Failed to create product: ${error.message}`));
                })
            );
    }

    updateProduct(
        id: number,
        product: ProductDto,
        image?: File
    ): Observable<ProductDto> {
        return this.authService.token$.pipe(
            switchMap(token => {
                if (!token) {
                    return throwError(() => new Error('No authentication token available'));
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

                const formData = new FormData();
                for (const key in product) {
                    if (product.hasOwnProperty(key)) {
                        formData.append(key, product[key as keyof ProductDto] as string | Blob);
                    }
                }
                if (image) {
                    formData.append('image', image, image.name);
                }

                return this.http.put<ProductDto>(`${this.apiUrl}/${id}`, formData, { headers }).pipe(
                    catchError(error => {
                        console.error('Error in product update process:', error);
                        return throwError(() => new Error(error.message || 'Product update failed. Please try again.'));
                    })
                );
            }),
            catchError(this.handleError)
        );
    }

    deleteProduct(id: number): Observable<ProductDto> {
        return this.authService.token$.pipe(
            switchMap(token => {
                if (!token) {
                    return throwError(() => new Error('No authentication token available'));
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
                return this.http.delete<ProductDto>(`${this.apiUrl}/${id}`, { headers }).pipe(
                    catchError(error => {
                        console.error('Error in product deletion process:', error);
                        return throwError(() => new Error(error.message || 'Product deletion failed. Please try again.'));
                    })
                );
            }),
            catchError(this.handleError)
        );
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

    refreshProducts() {
        this.getProducts().subscribe(
            (response) => this.productsSubject.next(response)
        );
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
