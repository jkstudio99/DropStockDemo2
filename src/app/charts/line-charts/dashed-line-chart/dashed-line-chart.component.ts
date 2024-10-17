import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DashedLineChartService } from "./dashed-line-chart.service";

@Component({
    selector: 'app-dashed-line-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './dashed-line-chart.component.html',
    styleUrl: './dashed-line-chart.component.scss'
})
export class DashedLineChartComponent {

    constructor(
        private dashedLineChartService: DashedLineChartService
    ) {}

    ngOnInit(): void {
        this.dashedLineChartService.loadChart();
    }

}