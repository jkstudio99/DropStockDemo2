import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TotalSalesService } from './total-sales.service';

@Component({
    selector: 'app-total-sales',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './total-sales.component.html',
    styleUrl: './total-sales.component.scss'
})
export class TotalSalesComponent {

    constructor(
        private totalSalesService: TotalSalesService
    ) {}

    ngOnInit(): void {
        this.totalSalesService.loadChart();
    }

}