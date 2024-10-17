import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DatetimeAreaChartService } from './datetime-area-chart.service';

@Component({
    selector: 'app-datetime-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './datetime-area-chart.component.html',
    styleUrl: './datetime-area-chart.component.scss'
})
export class DatetimeAreaChartComponent {

    constructor(
        private datetimeAreaChartService: DatetimeAreaChartService
    ) {}

    ngOnInit(): void {
        this.datetimeAreaChartService.loadChart();
    }

}