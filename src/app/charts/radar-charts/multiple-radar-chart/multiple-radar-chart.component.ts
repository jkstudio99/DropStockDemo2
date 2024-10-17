import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MultipleRadarChartService } from './multiple-radar-chart.service';

@Component({
    selector: 'app-multiple-radar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './multiple-radar-chart.component.html',
    styleUrl: './multiple-radar-chart.component.scss'
})
export class MultipleRadarChartComponent {

    constructor(
        private multipleRadarChartService: MultipleRadarChartService
    ) {}

    ngOnInit(): void {
        this.multipleRadarChartService.loadChart();
    }

}