import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectsRoadmapService } from './projects-roadmap.service';

@Component({
    selector: 'app-projects-roadmap:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './projects-roadmap.component.html',
    styleUrl: './projects-roadmap.component.scss'
})
export class ProjectsRoadmapComponent {

    constructor(
        private projectsRoadmapService: ProjectsRoadmapService
    ) {}

    ngOnInit(): void {
        this.projectsRoadmapService.loadChart();
    }

}