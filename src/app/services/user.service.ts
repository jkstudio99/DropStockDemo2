import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginModel } from '../shared/DTOs/LoginModel';
import { RegisterModel } from '../shared/DTOs/RegisterModel';
import { TokenResponse } from '../shared/DTOs/jwt-model/Response/TokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.apiBaseUrl + '/Authentication/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
  
  constructor(private http: HttpClient) { }

  login(data: LoginModel): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.apiURL + 'login', 
      data, 
      this.httpOptions
    );
  }

  register(data: RegisterModel): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.apiURL + 'register-user', 
      data, 
      this.httpOptions
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
}