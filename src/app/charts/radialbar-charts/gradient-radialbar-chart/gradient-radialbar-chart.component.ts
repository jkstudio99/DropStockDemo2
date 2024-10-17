import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { GradientRadialbarChartService } from './gradient-radialbar-chart.service';

@Component({
    selector: 'app-gradient-radialbar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './gradient-radialbar-chart.component.html',
    styleUrl: './gradient-radialbar-chart.component.scss'
})
export class GradientRadialbarChartComponent {

    constructor(
        private gradientRadialbarChartService: GradientRadialbarChartService
    ) {}

    ngOnInit(): void {
        this.gradientRadialbarChartService.loadChart();
    }

}