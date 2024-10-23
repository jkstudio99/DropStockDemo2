import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: 'app-sign-up',
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
        MatButton,
        MatSelectModule,
    ],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
    hidePassword = true;
    hideConfirmPassword = true;
    signUpForm: FormGroup;
    errorMessage: string = '';
    isLoading = false;
    private unsubscribe$ = new Subject<void>();

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private languageService: LanguageService,
        private translate: TranslateService
    ) {
        this.signUpForm = this.fb.group(
            {
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
                email: [
                    '',
                    {
                        validators: [Validators.required, Validators.email],
                        updateOn: 'change',
                    },
                ],
                password: [
                    '',
                    {
                        validators: [
                            Validators.required,
                            Validators.minLength(8),
                        ],
                        updateOn: 'change',
                    },
                ],
                confirmPassword: [
                    '',
                    {
                        validators: [Validators.required],
                        updateOn: 'change',
                    },
                ],
                role: ['User', Validators.required],
            },
            { validator: this.passwordMatchValidator }
        );
    }

    ngOnInit(): void {
        this.themeService.isToggled$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((isToggled) => {
                // Handle theme changes if needed
            });

        this.languageService.initializeLanguage().then(() => {
            console.log('Language initialized:', this.languageService.getCurrentLanguage());
            console.log('TranslateService current lang:', this.translate.currentLang);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getCurrentLanguage(): string {
        return this.languageService.getCurrentLanguage();
    }

    changeLanguage(lang: string): void {
        this.languageService.changeLanguage(lang);
        this.translate.use(lang);
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }

    toggleConfirmPasswordVisibility(): void {
        this.hideConfirmPassword = !this.hideConfirmPassword;
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null
            : { passwordMismatch: true };
    }

    onSubmit(): void {
        if (this.signUpForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            const { username, email, password, confirmPassword, role } =
                this.signUpForm.value;

            this.authService
                .register({ username, email, password, confirmPassword, role })
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe({
                    next: (response) => {
                        this.isLoading = false;
                        Swal.fire({
                            icon: 'success',
                            title: this.translate.instant(
                                'SIGN_UP.REGISTRATION_SUCCESS'
                            ),
                            text: this.translate.instant(
                                'SIGN_UP.REGISTRATION_SUCCESS_MESSAGE'
                            ),
                            confirmButtonText:
                                this.translate.instant('COMMON.OK'),
                            customClass: {
                                popup: 'custom-swal-popup',
                                title: 'custom-swal-title',
                                htmlContainer: 'custom-swal-content',
                                confirmButton: 'custom-swal-confirm-button',
                            },
                        }).then(() => {
                            this.router.navigate(['/authentication/sign-in']);
                        });
                    },
                    error: (error) => {
                        console.error('Registration error:', error);
                        this.isLoading = false;
                        this.errorMessage = this.translate.instant(
                            'SIGN_UP.ERROR_MESSAGE',
                            {
                                message:
                                    error.error?.message ||
                                    'An error occurred during registration',
                            }
                        );
                        Swal.fire({
                            icon: 'error',
                            title: this.translate.instant(
                                'SIGN_UP.ERROR_TITLE'
                            ),
                            text: this.errorMessage,
                            confirmButtonText:
                                this.translate.instant('COMMON.OK'),
                            customClass: {
                                popup: 'custom-swal-popup',
                                title: 'custom-swal-title',
                                htmlContainer: 'custom-swal-content',
                                confirmButton: 'custom-swal-confirm-button',
                            },
                        });
                    },
                });
        }
    }
}
