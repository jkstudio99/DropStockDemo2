import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DataLabelsColumnChartService } from './data-labels-column-chart.service';

@Component({
    selector: 'app-data-labels-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './data-labels-column-chart.component.html',
    styleUrl: './data-labels-column-chart.component.scss'
})
export class DataLabelsColumnChartComponent {

    constructor(
        private dataLabelsColumnChartService: DataLabelsColumnChartService
    ) {}

    ngOnInit(): void {
        this.dataLabelsColumnChartService.loadChart();
    }

}