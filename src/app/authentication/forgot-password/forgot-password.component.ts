import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    message: string = '';
    error: boolean = false;
    isLoading = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        if (this.forgotPasswordForm.valid) {
            this.isLoading = true;
            const { email } = this.forgotPasswordForm.value;
            this.authService.forgotPassword(email).subscribe({
                next: (response: any) => {
                    this.isLoading = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.message || 'เราได้ส่งคำแนะนำในการรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว',
                        confirmButtonText: 'OK'
                    });
                    this.forgotPasswordForm.reset();
                },
                error: (error: any) => {
                    this.isLoading = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.error?.message || 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
                        confirmButtonText: 'OK'
                    });
                },
            });
        }
    }
}
