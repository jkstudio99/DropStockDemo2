import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mp-total-projects',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './mp-total-projects.component.html',
    styleUrl: './mp-total-projects.component.scss'
})
export class MpTotalProjectsComponent {}