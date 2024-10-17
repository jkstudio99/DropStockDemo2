import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PieDonutChartService } from './pie-donut-chart.service';

@Component({
    selector: 'app-pie-donut-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './pie-donut-chart.component.html',
    styleUrl: './pie-donut-chart.component.scss'
})
export class PieDonutChartComponent {

    constructor(
        private pieDonutChartService: PieDonutChartService
    ) {}

    ngOnInit(): void {
        this.pieDonutChartService.loadChart();
    }

}