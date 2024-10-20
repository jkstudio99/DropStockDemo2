import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/' + environment.cloudinary.cloudName + '/image/upload';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dotnet8');  // ใช้ชื่อ upload preset ที่ถูกต้อง

    console.log('Uploading to Cloudinary:', this.cloudinaryUrl);
    console.log('Upload preset:', 'dotnet8');

    return this.http.post(this.cloudinaryUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Cloudinary upload error:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(`Server-side error: ${error.status} ${error.statusText}`);
          console.error('Error body:', error.error);
        }
        return throwError(() => new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`));
      })
    );
  }
}
