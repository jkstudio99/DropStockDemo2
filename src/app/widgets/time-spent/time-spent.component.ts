import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TimeSpentService } from './time-spent.service';

@Component({
    selector: 'app-time-spent:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './time-spent.component.html',
    styleUrl: './time-spent.component.scss'
})
export class TimeSpentComponent {

    constructor(
        private timeSpentService: TimeSpentService
    ) {}

    ngOnInit(): void {
        this.timeSpentService.loadChart();
    }

}