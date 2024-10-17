import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TotalRevenueService } from './total-revenue.service';

@Component({
    selector: 'app-total-revenue:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './total-revenue.component.html',
    styleUrl: './total-revenue.component.scss'
})
export class TotalRevenueComponent {

    // isToggled
    isToggled = false;

    constructor(
        private totalRevenueService: TotalRevenueService,
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.totalRevenueService.loadChart();
    }

}