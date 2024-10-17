import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsWithInputComponent } from './chips-with-input/chips-with-input.component';
import { ChipsDragDropComponent } from './chips-drag-drop/chips-drag-drop.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';
import { ChipsFormControlComponent } from './chips-form-control/chips-form-control.component';

@Component({
    selector: 'app-chips',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatChipsModule, ChipsWithInputComponent, ChipsDragDropComponent, ChipsAutocompleteComponent, ChipsFormControlComponent],
    templateUrl: './chips.component.html',
    styleUrl: './chips.component.scss'
})
export class ChipsComponent {

    readonly bestBoys: string[] = ['Samoyed', 'Akita Inu', 'Alaskan Malamute', 'Siberian Husky'];

}