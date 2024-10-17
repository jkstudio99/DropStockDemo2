import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicTreemapChartService } from './basic-treemap-chart.service';

@Component({
    selector: 'app-basic-treemap-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './basic-treemap-chart.component.html',
    styleUrl: './basic-treemap-chart.component.scss'
})
export class BasicTreemapChartComponent {

    constructor(
        private basicTreemapChartService: BasicTreemapChartService
    ) {}

    ngOnInit(): void {
        this.basicTreemapChartService.loadChart();
    }

}