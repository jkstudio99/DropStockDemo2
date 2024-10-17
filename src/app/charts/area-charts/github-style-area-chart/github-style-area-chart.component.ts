import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { GithubStyleAreaChartService } from './github-style-area-chart.service';

@Component({
    selector: 'app-github-style-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './github-style-area-chart.component.html',
    styleUrl: './github-style-area-chart.component.scss'
})
export class GithubStyleAreaChartComponent {

    constructor(
        private githubStyleAreaChartService: GithubStyleAreaChartService
    ) {}

    ngOnInit(): void {
        this.githubStyleAreaChartService.loadChart();
    }

}