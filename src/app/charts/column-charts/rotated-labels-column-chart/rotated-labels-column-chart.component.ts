import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { RotatedLabelsColumnChartService } from './rotated-labels-column-chart.service';

@Component({
    selector: 'app-rotated-labels-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './rotated-labels-column-chart.component.html',
    styleUrl: './rotated-labels-column-chart.component.scss'
})
export class RotatedLabelsColumnChartComponent {

    constructor(
        private rotatedLabelsColumnChartService: RotatedLabelsColumnChartService
    ) {}

    ngOnInit(): void {
        this.rotatedLabelsColumnChartService.loadChart();
    }

}