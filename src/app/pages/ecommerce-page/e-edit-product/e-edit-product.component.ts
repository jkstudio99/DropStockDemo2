import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../shared/DTOs/CategoryModel';
import { ProductDto } from '../../../shared/DTOs/ProductModel';
import { switchMap, of, catchError } from 'rxjs';

@Component({
    selector: 'app-e-edit-product',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgFor,
        NgClass,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatIconModule,
    ],
    templateUrl: './e-edit-product.component.html',
    styleUrls: ['./e-edit-product.component.scss'],
})
export class EEditProductComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    productForm!: FormGroup;
    isLoading = false;
    selectedImage: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;
    uploadProgress = 0;
    isDragover = false;
    categories: CategoryModel[] = [];
    productId!: number;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private cloudinaryService: CloudinaryService,
        private authService: AuthService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadCategories();
        this.loadProductData();
    }

    private initForm(): void {
        this.productForm = this.fb.group({
            productname: ['', [Validators.required]],
            unitprice: ['', [Validators.required, Validators.min(0)]],
            unitinstock: ['', [Validators.required, Validators.min(0)]],
            categoryid: ['', [Validators.required]],
            image: [null],
            // ไม่จำเป็นต้องเพิ่ม createddate และ modifieddate ที่นี่
        });
    }

    private loadCategories(): void {
        this.categoryService.getActiveCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: (error) => {
                console.error('Error loading categories:', error);
                Swal.fire('Error', 'Failed to load categories', 'error');
            },
        });
    }

    private loadProductData(): void {
        this.route.params.subscribe((params) => {
            this.productId = +params['id'];
            this.fetchProductDetails();
        });
    }

    private fetchProductDetails(): void {
        this.isLoading = true;
        this.productService.getProduct(this.productId).subscribe({
            next: this.handleProductFetchSuccess.bind(this),
            error: this.handleProductFetchError.bind(this),
        });
    }

    private handleProductFetchSuccess(product: any): void {
        this.productForm.patchValue({
            productname: product.productname,
            unitprice: product.unitprice,
            unitinstock: product.unitinstock,
            categoryid: product.categoryid,
        });
        this.imagePreview = product.productpicture;
        this.isLoading = false;
    }

    private handleProductFetchError(error: any): void {
        console.error('Error fetching product:', error);
        this.isLoading = false;
        this.showErrorAlert('ไม่สามารถดึงข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง');
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

    handleFile(file: File) {
        if (file && file.type.startsWith('image/')) {
            this.selectedImage = file;
            this.productForm.patchValue({ image: file });
            this.productForm.get('image')?.updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid File Type',
                text: 'Please select an image file.',
                confirmButtonColor: '#001EE0',
                iconColor: '#FF4023',
            });
        }
    }

    removeFile(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.selectedImage = null;
        this.imagePreview = null;
        this.productForm.patchValue({ image: null });
        this.productForm.get('image')?.updateValueAndValidity();
    }

    onSubmit(): void {
        if (
            this.productForm.valid &&
            (this.selectedImage || this.imagePreview)
        ) {
            this.isLoading = true;
            const productData = this.productForm.value;
            this.productService
                .updateProduct(
                    this.productId,
                    productData,
                    this.selectedImage as File
                )
                .subscribe({
                    next: (response) => {
                        console.log('Product updated successfully:', response);
                        this.isLoading = false;
                        Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ!',
                            text: 'แก้ไขสินค้าเรียบร้อยแล้ว',
                            confirmButtonColor: '#001EE0',
                            iconColor: '#25B003',
                        }).then(() => {
                            this.router.navigate([
                                '/dashboard/ecommerce-page/products-list',
                            ]);
                        });
                    },
                    error: (error) => {
                        console.error('Error updating product:', error);
                        this.isLoading = false;
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            confirmButtonColor: '#001EE0',
                            iconColor: '#FF4023',
                            text: `ไม่สามารถแก้ไขสินค้าได้: ${
                                error.message || 'Unknown error'
                            }`,
                        });
                    },
                });
        } else {
            console.error('Form is invalid or no image selected/previewed');
        }
    }

    private showErrorAlert(message: string): void {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: message,
            confirmButtonColor: '#001EE0',
            iconColor: '#FF4023',
        });
    }

    private showPartialSuccessAlert(): void {
        Swal.fire({
            icon: 'warning',
            title: 'สำเร็จบางส่วน',
            text: 'แก้ไขข้อมูลสินค้าสำเร็จ แต่ไม่สามารถอัปโหลดรูปภาพได้',
            showCancelButton: true,
            confirmButtonText: 'ลองอีกครั้ง',
            cancelButtonText: 'ตกลง',
            confirmButtonColor: '#001EE0',
            iconColor: '#FF4023',
        }).then((result) => {
            if (result.isConfirmed) {
                this.retryImageUpload();
            } else {
                this.router.navigate([
                    '/dashboard/ecommerce-page/products-list',
                ]);
            }
        });
    }

    private retryImageUpload(): void {
        if (this.selectedImage && this.productId) {
            this.isLoading = true;
            this.productService
                .uploadProductImage(this.productId, this.selectedImage)
                .subscribe({
                    next: () => {
                        this.onSubmit();
                    },
                    error: (error) => {
                        console.error('Error uploading image on retry:', error);
                        this.showErrorAlert(
                            'ไม่สามารถอัปโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง'
                        );
                    },
                    complete: () => {
                        this.isLoading = false;
                    },
                });
        }
    }
}
