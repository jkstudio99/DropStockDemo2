import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicColumnChartService } from './basic-column-chart.service';

@Component({
    selector: 'app-basic-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './basic-column-chart.component.html',
    styleUrl: './basic-column-chart.component.scss'
})
export class BasicColumnChartComponent {

    constructor(
        private basicColumnChartService: BasicColumnChartService
    ) {}

    ngOnInit(): void {
        this.basicColumnChartService.loadChart();
    }

}