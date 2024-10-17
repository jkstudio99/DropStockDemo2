import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicRadarChartService } from './basic-radar-chart.service';

@Component({
    selector: 'app-basic-radar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './basic-radar-chart.component.html',
    styleUrl: './basic-radar-chart.component.scss'
})
export class BasicRadarChartComponent {

    constructor(
        private basicRadarChartService: BasicRadarChartService
    ) {}

    ngOnInit(): void {
        this.basicRadarChartService.loadChart();
    }

}