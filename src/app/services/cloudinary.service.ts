import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    formData.append('api_key', environment.cloudinary.apiKey);

    console.log('Uploading to Cloudinary:', this.cloudinaryUrl);
    console.log('Upload preset:', environment.cloudinary.uploadPreset);

    return this.http.post(this.cloudinaryUrl, formData).pipe(
      catchError(error => {
        console.error('Cloudinary upload error:', error);
        if (error.error && error.error.error) {
          console.error('Cloudinary error details:', error.error.error);
        }
        return throwError(() => new Error('Image upload failed. Please try again.'));
      })
    );
  }
}
