import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, switchMap, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ProductDto, ProductResponse } from "../shared/DTOs/ProductModel";
import { AuthService } from "./auth.service";
import { CloudinaryService } from "./cloudinary.service";
import { TokenResponse } from "../shared/DTOs/jwt-model/Response/TokenResponse";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/Product`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService
  ) {}

  getProducts(
    options: {
      page?: number;
      limit?: number;
      searchQuery?: string;
      selectedCategory?: number;
    } = {}
  ): Observable<ProductResponse> {
    const { page = 1, limit = 10, searchQuery, selectedCategory } = options;
    let params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());

    if (searchQuery) {
      params = params.set("searchQuery", searchQuery);
    }

    if (selectedCategory) {
      params = params.set("selectedCategory", selectedCategory.toString());
    }

    const token = this.authService.getToken();
    if (!token) {
      console.error("No token available");
      return throwError(
        () => new Error("Authentication failed: No token available")
      );
    }

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const url = `${this.apiUrl}`;
    console.log("Making API request to:", url);
    console.log("Headers:", headers);
    console.log("Params:", params);

    return this.http.get<ProductResponse>(url, { params, headers }).pipe(
      catchError((error) => {
        console.error("HTTP error:", error);
        if (error.status === 401) {
          return this.refreshTokenAndRetry(() => this.getProducts(options));
        }
        return throwError(
          () => new Error(`API request failed: ${error.message}`)
        );
      })
    );
  }

  getProduct(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductDto, image: File): Observable<ProductDto> {
    const formData = new FormData();
    formData.append("image", image);
    for (const key in product) {
      if (product[key as keyof ProductDto] !== undefined) {
        formData.append(key, product[key as keyof ProductDto] as string);
      }
    }
    return this.http.post<ProductDto>(this.apiUrl, formData);
  }

  updateProduct(
    id: number,
    product: ProductDto,
    image?: File
  ): Observable<ProductDto> {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    for (const key in product) {
      if (product[key as keyof ProductDto] !== undefined) {
        formData.append(key, product[key as keyof ProductDto] as string);
      }
    }
    return this.http.put<ProductDto>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred in ProductService:", error);
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error("Client-side error:", error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }
    return throwError(
      () => new Error("Something went wrong; please try again later.")
    );
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.authService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    return this.http.post<TokenResponse>(`${environment.apiBaseUrl}/authentication/refresh-token`, { token: refreshToken }).pipe(
      map(response => {
        this.authService.setToken(response.token);
        this.authService.setRefreshToken(response.refreshToken);
        return response.token;
      })
    );
  }

  private refreshTokenAndRetry(
    retryCall: () => Observable<any>
  ): Observable<any> {
    return retryCall().pipe(
      catchError((error) => {
        if (error.status === 401) {
          return retryCall();
        }
        return throwError(() => error);
      })
    );
  }
}
