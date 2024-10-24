import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
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
})
export class SignInComponent implements OnInit, OnDestroy {
    hide = true; // To toggle password visibility
    loginForm: FormGroup; // Login form
    errorMessage: string = ''; // To display error message
    isLoading = false; // Loading status indicator
    private unsubscribe$ = new Subject<void>(); // Subject for cleanup

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private languageService: LanguageService,
        private translate: TranslateService
    ) {
        // Define the form with validators
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
        // Subscribe to theme changes
        this.themeService.isToggled$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                // Handle theme changes
            });

        // Set current language for translation
        const currentLang = this.languageService.getCurrentLanguage();
        this.translate.use(currentLang);
        console.log('Current language:', currentLang);
        console.log(
            'Translation test:',
            this.translate.instant('SIGN_IN.LOGIN_SUCCESS')
        );
    }

    ngOnDestroy(): void {
        // Cleanup to prevent memory leaks
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // Return the current language
    getCurrentLanguage(): string {
        return this.languageService.getCurrentLanguage();
    }

    // Function to change the language
    changeLanguage(lang: string): void {
        this.languageService.changeLanguage(lang);
        this.translate.use(lang);
    }

    // Toggle password visibility
    togglePasswordVisibility(): void {
        this.hide = !this.hide;
    }

    // Handle form submission
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
                        localStorage.setItem('accessToken', res.token!);
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

    // Get the appropriate error message for form fields
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
