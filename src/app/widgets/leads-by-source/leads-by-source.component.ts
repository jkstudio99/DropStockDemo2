import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { LeadsBySourceService } from './leads-by-source.service';

@Component({
    selector: 'app-leads-by-source:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatProgressBarModule],
    templateUrl: './leads-by-source.component.html',
    styleUrl: './leads-by-source.component.scss'
})
export class LeadsBySourceComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private leadsBySourceService: LeadsBySourceService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.leadsBySourceService.loadChart();
    }

}