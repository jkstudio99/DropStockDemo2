import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CategoryModel } from '../shared/DTOs/CategoryModel';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private apiUrl = environment.apiBaseUrl + '/category';

    constructor(private http: HttpClient, private authService: AuthService) {}

    getCategories(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(this.apiUrl, this.getHttpOptions());
    }

    getActiveCategories(): Observable<CategoryModel[]> {
        return this.getCategories().pipe(
            map(categories => categories.filter(cat => cat.categorystatus === 1))
        );
    }

    getCategoryById(id: number): Observable<CategoryModel> {
        return this.http.get<CategoryModel>(`${this.apiUrl}/${id}`, this.getHttpOptions());
    }

    createCategory(category: Omit<CategoryModel, 'categoryid'>): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(this.apiUrl, category, this.getHttpOptions());
    }

    updateCategory(id: number, category: Partial<CategoryModel>): Observable<CategoryModel> {
        return this.http.put<CategoryModel>(`${this.apiUrl}/${id}`, category, this.getHttpOptions());
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
    }

    private getHttpOptions(): { headers: HttpHeaders } {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        };
    }
}
