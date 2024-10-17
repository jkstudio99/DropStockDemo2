import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DistributedColumnChartService } from './distributed-column-chart.service';

@Component({
    selector: 'app-distributed-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './distributed-column-chart.component.html',
    styleUrl: './distributed-column-chart.component.scss'
})
export class DistributedColumnChartComponent {

    constructor(
        private distributedColumnChartService: DistributedColumnChartService
    ) {}

    ngOnInit(): void {
        this.distributedColumnChartService.loadChart();
    }

}