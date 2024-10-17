import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicCandlestickChartService } from './basic-candlestick-chart.service';

@Component({
    selector: 'app-basic-candlestick-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './basic-candlestick-chart.component.html',
    styleUrl: './basic-candlestick-chart.component.scss'
})
export class BasicCandlestickChartComponent {

    constructor(
        private basicCandlestickChartService: BasicCandlestickChartService
    ) {}

    ngOnInit(): void {
        this.basicCandlestickChartService.loadChart();
    }

}