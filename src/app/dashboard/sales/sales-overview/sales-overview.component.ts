import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { SalesOverviewService } from './sales-overview.service';

@Component({
    selector: 'app-sales-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './sales-overview.component.html',
    styleUrl: './sales-overview.component.scss'
})
export class SalesOverviewComponent {

    constructor(
        private salesOverviewService: SalesOverviewService
    ) {}

    ngOnInit(): void {
        this.salesOverviewService.loadChart();
    }

}