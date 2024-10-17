import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CoursesSalesService } from './courses-sales.service';

@Component({
    selector: 'app-courses-sales:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './courses-sales.component.html',
    styleUrl: './courses-sales.component.scss'
})
export class CoursesSalesComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private coursesSalesService: CoursesSalesService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.coursesSalesService.loadChart();
    }

}