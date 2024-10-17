import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MultipleYaxisChartService } from './multiple-yaxis-chart.service';

@Component({
    selector: 'app-multiple-yaxis-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './multiple-yaxis-chart.component.html',
    styleUrl: './multiple-yaxis-chart.component.scss'
})
export class MultipleYaxisChartComponent {

    constructor(
        private multipleYaxisChartService: MultipleYaxisChartService
    ) {}

    ngOnInit(): void {
        this.multipleYaxisChartService.loadChart();
    }

}