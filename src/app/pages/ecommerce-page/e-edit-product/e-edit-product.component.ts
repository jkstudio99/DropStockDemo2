import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-e-edit-product',
    standalone: true,
    imports: [
        RouterLink, NgIf, MatCardModule, MatButtonModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, NgxEditorModule, FileUploadModule,
        MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './e-edit-product.component.html',
    styleUrls: ['./e-edit-product.component.scss'],
})
export class EEditProductComponent implements OnInit {
    productForm!: FormGroup;
    selectedImage: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;
    isLoading = false;
    productId: number;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.initForm();
        this.productId = 0;
    }

    ngOnInit(): void {
        this.loadProductData();
    }

    private initForm(): void {
        this.productForm = this.fb.group({
            productname: ['', [Validators.required]],
            unitprice: ['', [Validators.required, Validators.min(0)]],
            unitinstock: ['', [Validators.required, Validators.min(0)]],
            categoryid: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
        });
    }

    private loadProductData(): void {
        this.route.params.subscribe(params => {
            this.productId = +params['id'];
            this.fetchProductDetails();
        });
    }

    private fetchProductDetails(): void {
        this.isLoading = true;
        this.productService.getProduct(this.productId).subscribe({
            next: this.handleProductFetchSuccess.bind(this),
            error: this.handleProductFetchError.bind(this)
        });
    }

    private handleProductFetchSuccess(product: any): void {
        this.productForm.patchValue(product);
        this.imagePreview = product.productpicture || null;
        this.isLoading = false;
    }

    private handleProductFetchError(error: any): void {
        console.error('Error fetching product:', error);
        this.isLoading = false;
        this.showErrorAlert('ไม่สามารถดึงข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง');
    }

    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.selectedImage = file;
            this.createImagePreview(file);
        }
    }

    private createImagePreview(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

    onSubmit(): void {
        if (this.productForm.valid) {
            this.isLoading = true;
            const productData = this.productForm.value;
            this.updateProduct(productData);
        }
    }

    private updateProduct(productData: any): void {
        this.productService.updateProduct(this.productId, productData, this.selectedImage || new File([], ""))
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: this.handleUpdateSuccess.bind(this),
                error: this.handleUpdateError.bind(this)
            });
    }

    private handleUpdateSuccess(): void {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ!',
            text: 'แก้ไขสินค้าเรียบร้อยแล้ว',
        }).then(() => {
            this.router.navigate(['/dashboard/ecommerce-page/products-list']);
        });
    }

    private handleUpdateError(error: any): void {
        console.error('Error updating product:', error);
        let errorMessage = 'ไม่สามารถแก้ไขสินค้าได้ กรุณาลองใหม่อีกครั้ง';
        if (error.message) {
            errorMessage = error.message;
        } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
        }
        console.error('Detailed error:', JSON.stringify(error, null, 2));
        this.showErrorAlert(errorMessage);
    }

    private showErrorAlert(message: string): void {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: message,
        });
    }
}
