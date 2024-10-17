import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PolygonRadarChartService } from './polygon-radar-chart.service';

@Component({
    selector: 'app-polygon-radar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './polygon-radar-chart.component.html',
    styleUrl: './polygon-radar-chart.component.scss'
})
export class PolygonRadarChartComponent {

    constructor(
        private polygonRadarChartService: PolygonRadarChartService
    ) {}

    ngOnInit(): void {
        this.polygonRadarChartService.loadChart();
    }

}