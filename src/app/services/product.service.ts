import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { ProductDto, ProductResponse } from '../shared/DTOs/ProductModel';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CloudinaryService } from './cloudinary.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserRole } from '../shared/DTOs/UserRoleModel';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiUrl = environment.apiBaseUrl + '/product';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private cloudinaryService: CloudinaryService,
        private router: Router
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

    deleteProduct(id: number): Observable<void> {
        return new Observable<void>((observer) => {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: 'คุณไม่สามารถย้อนกลับกากระทำนี้ได้!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#001EE0',
                cancelButtonColor: '#FF4023',
                confirmButtonText: 'ใช่, ลบเลย!',
                cancelButtonText: 'ยกเลิก',
                background: '#fff',
                iconColor: '#001EE0',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-danger',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    this.http
                        .delete<void>(
                            `${this.apiUrl}/${id}`,
                            this.getHttpOptions()
                        )
                        .subscribe({
                            next: () => {
                                observer.next();
                                observer.complete();
                            },
                            error: (err) => {
                                observer.error(err);
                            },
                        });
                } else {
                    observer.complete();
                }
            });
        });
    }

    private showErrorAlert(message: string): void {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
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
        if (!token) {
            console.error('No token available');
        }
        return {
            headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${token || ''}`
            ),
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

    private checkAuthAndLoadProducts(): void {
        this.authService.isUserAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
                this.getProducts();
            } else {
                this.authService
                    .refreshToken()
                    .pipe(
                        switchMap(() => this.authService.isUserAuthenticated())
                    )
                    .subscribe({
                        next: (isAuthenticated) => {
                            if (isAuthenticated) {
                                this.getProducts();
                            } else {
                                throw new Error('Authentication failed');
                            }
                        },
                        error: (error) => {
                            console.error('Authentication error:', error);
                            this.router.navigate(['/authentication/sign-in']);
                        },
                    });
            }
        });
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
