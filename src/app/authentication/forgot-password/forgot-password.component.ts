import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService,
        private translate: TranslateService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    forgotPasswordForm: FormGroup;
    message: string = '';

    onSubmit() {
        if (this.forgotPasswordForm.valid) {
            const { email } = this.forgotPasswordForm.value;
            // Implement the forgot password functionality in AuthService
            this.authService.forgotPassword(email).subscribe({
                next: () => {
                    this.message = this.translate.instant(
                        'FORGOT_PASSWORD.SUCCESS_MESSAGE'
                    );
                },
                error: (error) => {
                    this.message = this.translate.instant(
                        'FORGOT_PASSWORD.ERROR_MESSAGE',
                        { message: error.error?.message || 'An error occurred' }
                    );
                },
            });
        }
    }
}
