import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-button-toggle',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonToggleModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
    templateUrl: './button-toggle.component.html',
    styleUrl: './button-toggle.component.scss'
})
export class ButtonToggleComponent {

    fontStyleControl = new FormControl('');
    fontStyle?: string;

    // Button toggle selection mode
    hideSingleSelectionIndicator = signal(false);
    hideMultipleSelectionIndicator = signal(false);
    toggleSingleSelectionIndicator() {
        this.hideSingleSelectionIndicator.update(value => !value);
    }
    toggleMultipleSelectionIndicator() {
        this.hideMultipleSelectionIndicator.update(value => !value);
    }

}