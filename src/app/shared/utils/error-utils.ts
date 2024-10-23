import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

export function getErrorMessage(err: HttpErrorResponse, translateService: TranslateService): string {
    // Implement the logic to extract and translate error messages
    // This is a placeholder implementation
    return err.error && typeof err.error === 'object' && 'message' in err.error
        ? translateService.instant(err.error.message)
        : translateService.instant('ERRORS.UNEXPECTED');
}
