import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { FileUploadModule } from '@iplab/ngx-file-upload';
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
        FileUploadModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './e-create-product.component.html',
    styleUrl: './e-create-product.component.scss',
})
export class ECreateProductComponent implements OnInit {
    // Text Editor
    editor!: Editor | null; // Make it nullable
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    productForm: FormGroup;
    selectedImage: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;

    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.productForm = this.fb.group({
            productname: ['', [Validators.required]],
            unitprice: ['', [Validators.required, Validators.min(0)]],
            unitinstock: ['', [Validators.required, Validators.min(0)]],
            categoryid: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
        });
    }

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.initializeForm();
    }

    private initializeForm(): void {
        // Any initialization logic here
        // For example, you might fetch categories from an API
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 1000); // Simulate a 1-second loading time
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.selectedImage = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmit(): void {
        if (this.productForm.valid) {
            const productData = this.productForm.value;
            this.productService
                .createProduct(productData, this.selectedImage || new File([], ""))
                .pipe(
                    catchError((error) => {
                        console.error('Error creating product:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่อีกครั้ง',
                        });
                        return throwError(() => new Error('Failed to create product'));
                    })
                )
                .subscribe(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: 'เพิ่มสินค้าเรียบร้อยแล้ว',
                    }).then(() => {
                        this.router.navigate(['/dashboard/ecommerce-page/products-list']);
                    });
                });
        }
    }
}
