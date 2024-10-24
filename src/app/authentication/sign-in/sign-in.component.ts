import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // ปรับตรงนี้
import { LanguageService } from '../../services/language.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatMenuModule,
        TranslateModule,
        MatIconModule,
        RouterLink,
        MatProgressSpinnerModule,
    ],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    hide = true; // ตัวแปรสำหรับแสดง/ซ่อนรหัสผ่าน
    loginForm: FormGroup; // ฟอร์มล็อกอิน
    errorMessage: string = ''; // ข้อความแสดงข้อผิดพลาด
    isLoading = false; // สถานะการโหลด
    private unsubscribe$ = new Subject<void>(); // Subject สำหรับ unsubscribe

    constructor(
        public themeService: CustomizerSettingsService, // ใช้บริการสำหรับธีม
        private fb: FormBuilder, // ใช้ FormBuilder สำหรับฟอร์ม
        private authService: AuthService, // ใช้ AuthService สำหรับการล็อกอิน
        private router: Router, // ใช้ Router สำหรับนำทาง
        private languageService: LanguageService, // ใช้ LanguageService สำหรับการเปลี่ยนภาษา
        private translate: TranslateService // ใช้ TranslateService สำหรับการแปล
    ) {
        // กำหนดค่าฟอร์มการล็อกอิน พร้อมการตรวจสอบค่า
        this.loginForm = this.fb.group({
            username: [
                '',
                {
                    validators: [
                        Validators.required,
                        Validators.pattern(/^[a-zA-Z0-9_-]{3,50}$/),
                    ],
                    updateOn: 'change',
                },
            ],
            password: [
                '',
                {
                    validators: [Validators.required, Validators.minLength(8)],
                    updateOn: 'change',
                },
            ],
            rememberMe: [false],
        });
    }

    ngOnInit(): void {
        // จัดการการเปลี่ยนแปลงธีมจาก CustomizerSettingsService
        this.themeService.isToggled$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((isToggled) => {
                // จัดการธีมเมื่อมีการเปลี่ยนแปลง
            });

        // ใช้ภาษาปัจจุบันจาก LanguageService และตั้งค่าการแปล
        const currentLang = this.languageService.getCurrentLanguage();
        this.translate.use(currentLang);
        console.log('Current language:', currentLang);
        console.log(
            'Translation test:',
            this.translate.instant('SIGN_IN.LOGIN_SUCCESS')
        );
    }

    ngOnDestroy(): void {
        // ปิดการ subscribe เพื่อป้องกันการรั่วไหลของข้อมูล
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // ฟังก์ชันสำหรับคืนค่าภาษาปัจจุบัน
    getCurrentLanguage(): string {
        return this.languageService.getCurrentLanguage();
    }

    // ฟังก์ชันสำหรับเปลี่ยนภาษา
    changeLanguage(lang: string): void {
        this.languageService.changeLanguage(lang); // เปลี่ยนภาษาผ่าน LanguageService
        this.translate.use(lang);
    }

    // ฟังก์ชันสำหรับแสดงหรือซ่อนรหัสผ่าน
    togglePasswordVisibility(): void {
        this.hide = !this.hide;
    }

    // ฟังก์ชันสำหรับส่งฟอร์มล็อกอิน
    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            const { username, password, rememberMe } = this.loginForm.value;

            this.authService
                .login({ username, password, rememberMe })
                .pipe(
                    takeUntil(this.unsubscribe$),
                    finalize(() => (this.isLoading = false))
                )
                .subscribe({
                    next: (res) => {
                        localStorage.setItem('refreshToken', res.refreshToken!);
                        localStorage.setItem(
                            'currentUser',
                            JSON.stringify(res)
                        );
                        Swal.fire({
                            icon: 'success',
                            title: this.translate.instant(
                                'SIGN_IN.SUCCESS_TITLE'
                            ),
                            text: this.translate.instant(
                                'SIGN_IN.SUCCESS_MESSAGE'
                            ),
                            confirmButtonText:
                                this.translate.instant('COMMON.OK'),
                            customClass: {
                                popup: 'custom-swal-popup',
                                title: 'custom-swal-title',
                                htmlContainer: 'custom-swal-content',
                                confirmButton: 'custom-swal-confirm-button',
                            },
                            buttonsStyling: false,
                        }).then(() => {
                            this.router.navigate(['/dashboard']);
                        });
                    },
                    error: (error) => {
                        console.error('Login error:', error);
                        const errorMessage =
                            error.error?.message ||
                            this.translate.instant('SIGN_IN.ERROR_MESSAGE');
                        Swal.fire({
                            icon: 'error',
                            title: this.translate.instant(
                                'SIGN_IN.ERROR_TITLE'
                            ),
                            text: errorMessage,
                            confirmButtonText:
                                this.translate.instant('COMMON.OK'),
                            customClass: {
                                popup: 'custom-swal-popup',
                                title: 'custom-swal-title',
                                htmlContainer: 'custom-swal-content',
                                confirmButton: 'custom-swal-confirm-button',
                            },
                            buttonsStyling: false,
                        });
                    },
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.loginForm.get(controlName);
        if (control?.hasError('required')) {
            return this.translate.instant(
                `SIGN_IN.${controlName.toUpperCase()}_REQUIRED`
            );
        }
        if (control?.hasError('pattern') && controlName === 'username') {
            return this.translate.instant('SIGN_IN.USERNAME_INVALID');
        }
        if (control?.hasError('minlength') && controlName === 'password') {
            return this.translate.instant('SIGN_IN.PASSWORD_MIN_LENGTH');
        }
        return '';
    }
}
