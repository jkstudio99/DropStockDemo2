import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { LineColumnChartService } from './line-column-chart.service';

@Component({
    selector: 'app-line-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './line-column-chart.component.html',
    styleUrl: './line-column-chart.component.scss'
})
export class LineColumnChartComponent {

    constructor(
        private lineColumnChartService: LineColumnChartService
    ) {}

    ngOnInit(): void {
        this.lineColumnChartService.loadChart();
    }

}