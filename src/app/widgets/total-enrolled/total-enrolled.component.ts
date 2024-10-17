import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-total-enrolled:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './total-enrolled.component.html',
    styleUrl: './total-enrolled.component.scss'
})
export class TotalEnrolledComponent {}