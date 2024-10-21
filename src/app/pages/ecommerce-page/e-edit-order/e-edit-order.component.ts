import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
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
import { OrderService } from '../../../services/order.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-e-edit-order',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
    ],
    templateUrl: './e-edit-order.component.html',
    styleUrls: ['./e-edit-order.component.scss'],
})
export class EEditOrderComponent implements OnInit {
    orderForm!: FormGroup;
    isLoading = false;
    orderId: number;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.initForm();
        this.orderId = 0;
    }

    ngOnInit(): void {
        this.loadOrderData();
    }

    private initForm(): void {
        this.orderForm = this.fb.group({
            ordername: ['', [Validators.required]],
            orderprice: ['', [Validators.required, Validators.min(0)]],
            orderstatus: ['', [Validators.required]],
            orderdetails: ['', [Validators.required]],
            customerid: [
                '',
                [Validators.required, Validators.pattern('^[0-9]*$')],
            ],
        });
    }

    private loadOrderData(): void {
        this.route.params.subscribe((params) => {
            this.orderId = +params['id'];
            this.fetchOrderDetails();
        });
    }

    private fetchOrderDetails(): void {
        this.isLoading = true;
        this.orderService.getOrder(this.orderId).subscribe({
            next: this.handleOrderFetchSuccess.bind(this),
            error: this.handleOrderFetchError.bind(this),
        });
    }

    private handleOrderFetchSuccess(order: any): void {
        this.orderForm.patchValue(order);
        this.isLoading = false;
    }

    private handleOrderFetchError(error: any): void {
        console.error('Error fetching order:', error);
        this.isLoading = false;
        this.showErrorAlert(
            'ไม่สามารถดึงข้อมูลคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง'
        );
    }

    onSubmit(): void {
        if (this.orderForm.valid) {
            this.isLoading = true;
            const orderData = this.orderForm.value;
            this.updateOrder(orderData);
        }
    }

    private updateOrder(orderData: any): void {
        this.orderService
            .updateOrder(this.orderId, orderData)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
                next: this.handleUpdateSuccess.bind(this),
                error: this.handleUpdateError.bind(this),
            });
    }

    private handleUpdateSuccess(): void {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ!',
            text: 'แก้ไขคำสั่งซื้อเรียบร้อยแล้ว',
            confirmButtonColor: '#001EE0',
            iconColor: '#25B003',
        }).then(() => {
            this.router.navigate(['/dashboard/ecommerce-page/orders']);
        });
    }

    private handleUpdateError(error: any): void {
        console.error('Error updating order:', error);
        let errorMessage = 'ไม่สามารถแก้ไขคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง';
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
            confirmButtonColor: '#001EE0',
            iconColor: '#FF4023',
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.orderForm.get(controlName);
        if (control?.hasError('required')) {
            return 'กรุณากรอกข้อมูลในช่องนี้';
        }
        if (control?.hasError('min')) {
            return 'ราคาต้องไม่ต่ำกว่า 0';
        }
        if (control?.hasError('pattern')) {
            return 'กรุณากรอกเฉพาะตัวเลข';
        }
        return '';
    }
}
