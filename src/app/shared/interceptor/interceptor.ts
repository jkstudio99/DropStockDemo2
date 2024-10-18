import { HttpInterceptorFn } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './errors.interceptor';

export const interceptors: HttpInterceptorFn[] = [
  AuthInterceptor,
  ErrorInterceptor
];
