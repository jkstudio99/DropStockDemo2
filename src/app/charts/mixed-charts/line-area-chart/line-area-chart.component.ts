import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { LineAreaChartService } from './line-area-chart.service';

@Component({
    selector: 'app-line-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './line-area-chart.component.html',
    styleUrl: './line-area-chart.component.scss'
})
export class LineAreaChartComponent {

    constructor(
        private lineAreaChartService: LineAreaChartService
    ) {}

    ngOnInit(): void {
        this.lineAreaChartService.loadChart();
    }

}