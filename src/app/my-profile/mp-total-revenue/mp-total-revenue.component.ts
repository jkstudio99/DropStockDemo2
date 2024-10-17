import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mp-total-revenue',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './mp-total-revenue.component.html',
    styleUrl: './mp-total-revenue.component.scss'
})
export class MpTotalRevenueComponent {}