import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-e-create-order',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        NgIf,
        MatIconModule
    ],
    templateUrl: './e-create-order.component.html',
    styleUrl: './e-create-order.component.scss'
})
export class ECreateOrderComponent implements OnInit {
    orderForm: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private authService: AuthService
    ) {
        this.orderForm = this.fb.group({
            ordername: ['', Validators.required],
            orderprice: [0, [Validators.required, Validators.min(0)]],
            orderstatus: ['', Validators.required],
            orderdetails: [''],
            customerid: [0, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.initializeForm();
    }

    private initializeForm(): void {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 1000); // Simulate a 1-second loading time
    }

    onSubmit(): void {
        if (this.orderForm.valid) {
            const orderData = this.orderForm.value;
            this.isLoading = true;
            this.orderService.createOrder(orderData)
                .pipe(
                    catchError((error) => {
                        console.error('Error creating order:', error);
                        let errorMessage = 'ไม่สามารถเพิ่มคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง';
                        if (error.status === 401) {
                            errorMessage = 'กรุณาเข้าสู่ระบบใหม่';
                            this.router.navigate(['/authentication/sign-in']);
                        } else if (error.status === 500) {
                            errorMessage = 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาติดต่อผู้ดูแลระบบ';
                        }
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: errorMessage,
                        });
                        this.isLoading = false;
                        return throwError(() => error);
                    })
                )
                .subscribe((response) => {
                    this.isLoading = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: 'เพิ่มคำสั่งซื้อเรียบร้อยแล้ว',
                    }).then(() => {
                        this.router.navigate(['/dashboard/ecommerce-page/orders']);
                    });
                });
        }
    }
}
