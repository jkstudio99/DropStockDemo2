import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-total-mentors:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './total-mentors.component.html',
    styleUrl: './total-mentors.component.scss'
})
export class TotalMentorsComponent {}