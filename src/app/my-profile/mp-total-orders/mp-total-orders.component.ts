import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mp-total-orders',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './mp-total-orders.component.html',
    styleUrl: './mp-total-orders.component.scss'
})
export class MpTotalOrdersComponent {}