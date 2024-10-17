import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  public mismatched(targetControl: AbstractControl): ValidatorFn {
    return (sourceControl: AbstractControl): ValidationErrors | null => {
      const targetVal = targetControl.value;
      const sourceVal = sourceControl.value;
      if (sourceVal === '') {
        return null;
      }
      return targetVal === sourceVal ? null : { mismatched: true };
    };
  }
}
