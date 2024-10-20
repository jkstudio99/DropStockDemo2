import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-e-create-product',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxEditorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatIconModule,
    ],
    templateUrl: './e-create-product.component.html',
    styleUrl: './e-create-product.component.scss',
})
export class ECreateProductComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef;

    productForm: FormGroup;
    selectedImage: File | null = null;
    imagePreviewUrl: string | ArrayBuffer | null = null;
    isDragover: boolean = false;

    isLoading: boolean = false;
    uploadProgress: number = 0;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private cloudinaryService: CloudinaryService,
        private authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.productForm = this.fb.group({
            productname: ['', [Validators.required]],
            unitprice: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
            unitinstock: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
            categoryname: ['', [Validators.required]],
            image: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.initializeForm();
        if (!this.authService.isAuthenticated()) {
            Swal.fire({
                icon: 'warning',
                title: 'ไม่ได้เข้าสู่ระบบ',
                text: 'คุณจำเป็นต้องเข้าสู่ระบบเพื่อเพิ่มสินค้า',
            }).then(() => {
                this.router.navigate(['/login']);
            });
        }
    }

    private initializeForm(): void {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.handleFile(file);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragover = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragover = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragover = false;
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    private handleFile(file: File) {
        if (file && file.type.startsWith('image/')) {
            this.selectedImage = file;
            this.productForm.patchValue({ image: file });
            this.productForm.get('image')?.updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imagePreviewUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid File Type',
                text: 'Please select an image file.',
            });
        }
    }

    onSubmit(): void {
        if (this.productForm.valid && this.selectedImage) {
            this.isLoading = true;
            const productData = this.productForm.value;

            console.log('Selected image:', this.selectedImage);

            if (this.selectedImage.size > 10 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'ไฟล์มีขนาดใหญ่เกินไป',
                    text: 'กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 10MB',
                });
                this.isLoading = false;
                return;
            }

            this.productService.createProduct(productData, this.selectedImage)
                .subscribe({
                    next: (response) => {
                        console.log('Product created successfully:', response);
                        this.isLoading = false;
                        Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ!',
                            text: 'เพิ่มสินค้าเรียบร้อยแล้ว',
                        }).then(() => {
                            this.router.navigate(['/dashboard/ecommerce-page/products-list']);
                        });
                    },
                    error: (error) => {
                        console.error('Detailed error creating product:', error);
                        this.isLoading = false;
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: `ไม่สามารถเพิ่มสินค้าได้: ${error.message || 'Unknown error'}`,
                        });
                    }
                });
        } else {
            console.error('Form is invalid or no image selected');
        }
    }

    private handleError = (error: any) => {
        console.error('Error:', error);
        this.isLoading = false;
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: `ไม่สามารถเพิ่มสินค้าได้: ${error.message || 'Unknown error'}`,
        });
    }

    removeFile(event?: Event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.selectedImage = null;
        this.imagePreviewUrl = null;
        this.uploadProgress = 0;
        this.productForm.patchValue({ image: null });
        this.productForm.get('image')?.updateValueAndValidity();
        if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
        }
    }

    checkAuthAndSubmit(): void {
        if (this.authService.isAuthenticated()) {
            this.onSubmit();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'ไม่ได้รับอนุญาต',
                text: 'กรุณาเ้าสู่ระบบก่อนเพิ่มสินค้า',
            });
            // Optionally, redirect to login page
            // this.router.navigate(['/login']);
        }
    }
}
