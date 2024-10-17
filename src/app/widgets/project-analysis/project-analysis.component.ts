import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectAnalysisService } from './project-analysis.service';

@Component({
    selector: 'app-project-analysis:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './project-analysis.component.html',
    styleUrl: './project-analysis.component.scss'
})
export class ProjectAnalysisComponent {

    constructor(
        private projectAnalysisService: ProjectAnalysisService
    ) {}

    ngOnInit(): void {
        this.projectAnalysisService.loadChart();
    }

}