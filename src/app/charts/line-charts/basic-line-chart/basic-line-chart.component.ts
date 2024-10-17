import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { BasicLineChartService } from "./basic-line-chart.service";

@Component({
    selector: 'app-basic-line-chart',
    standalone: true,
    imports: [MatCardModule, RouterLink],
    templateUrl: './basic-line-chart.component.html',
    styleUrl: './basic-line-chart.component.scss'
})
export class BasicLineChartComponent {

    constructor(
        private basicLineChartService: BasicLineChartService
    ) {}

    ngOnInit(): void {
        this.basicLineChartService.loadChart();
    }

}