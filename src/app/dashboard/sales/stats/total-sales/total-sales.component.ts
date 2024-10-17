import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TotalSalesService } from './total-sales.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-sales',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './total-sales.component.html',
    styleUrl: './total-sales.component.scss'
})
export class TotalSalesComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private totalSalesService: TotalSalesService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.totalSalesService.loadChart();
    }

}