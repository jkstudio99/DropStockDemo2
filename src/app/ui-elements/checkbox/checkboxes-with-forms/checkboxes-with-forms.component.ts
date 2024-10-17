import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-checkboxes-with-forms',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe],
    templateUrl: './checkboxes-with-forms.component.html',
    styleUrl: './checkboxes-with-forms.component.scss'
})
export class CheckboxesWithFormsComponent {

    private readonly _formBuilder = inject(FormBuilder);

    readonly toppings = this._formBuilder.group({
        pepperoni: false,
        extracheese: false,
        mushroom: false,
    });
    
}