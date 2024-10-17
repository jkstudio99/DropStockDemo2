import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MissingNullValuesAreaChartService } from './missing-null-values-area-chart.service';

@Component({
    selector: 'app-missing-null-values-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './missing-null-values-area-chart.component.html',
    styleUrl: './missing-null-values-area-chart.component.scss'
})
export class MissingNullValuesAreaChartComponent {

    constructor(
        private missingNullValuesAreaChartService: MissingNullValuesAreaChartService
    ) {}

    ngOnInit(): void {
        this.missingNullValuesAreaChartService.loadChart();
    }

}