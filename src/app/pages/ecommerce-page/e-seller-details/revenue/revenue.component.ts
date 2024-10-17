import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RevenueService } from './revenue.service';

@Component({
    selector: 'app-revenue',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './revenue.component.html',
    styleUrl: './revenue.component.scss'
})
export class RevenueComponent {

    constructor(
        private revenueService: RevenueService
    ) {}

    ngOnInit(): void {
        this.revenueService.loadChart();
    }

}