import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-ffw-prefix-suffix',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
    templateUrl: './ffw-prefix-suffix.component.html',
    styleUrl: './ffw-prefix-suffix.component.scss'
})
export class FfwPrefixSuffixComponent {

    // Password hide
    hide = true;

}