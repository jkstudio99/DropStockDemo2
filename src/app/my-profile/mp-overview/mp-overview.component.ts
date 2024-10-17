import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MpOverviewService } from './mp-overview.service';

@Component({
    selector: 'app-mp-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './mp-overview.component.html',
    styleUrl: './mp-overview.component.scss'
})
export class MpOverviewComponent {

    constructor(
        private mpOverviewService: MpOverviewService
    ) {}

    ngOnInit(): void {
        this.mpOverviewService.loadChart();
    }

}