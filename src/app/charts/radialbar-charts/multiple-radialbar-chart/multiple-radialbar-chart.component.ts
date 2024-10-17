import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MultipleRadialbarChartService } from './multiple-radialbar-chart.service';

@Component({
    selector: 'app-multiple-radialbar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './multiple-radialbar-chart.component.html',
    styleUrl: './multiple-radialbar-chart.component.scss'
})
export class MultipleRadialbarChartComponent {

    constructor(
        private multipleRadialbarChartService: MultipleRadialbarChartService
    ) {}

    ngOnInit(): void {
        this.multipleRadialbarChartService.loadChart();
    }

}