import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ZoomableLineChartService } from './zoomable-line-chart.service';

@Component({
    selector: 'app-zoomable-line-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './zoomable-line-chart.component.html',
    styleUrl: './zoomable-line-chart.component.scss'
})
export class ZoomableLineChartComponent {

    constructor(
        private zoomableLineChartService: ZoomableLineChartService
    ) {}

    ngOnInit(): void {
        this.zoomableLineChartService.loadChart();
    }

}