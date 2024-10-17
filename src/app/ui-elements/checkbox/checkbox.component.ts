import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { CheckboxesWithFormsComponent } from './checkboxes-with-forms/checkboxes-with-forms.component';
import { ParentCheckboxesComponent } from './parent-checkboxes/parent-checkboxes.component';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatCheckboxModule, ParentCheckboxesComponent, CheckboxesWithFormsComponent],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {}