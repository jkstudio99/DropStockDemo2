import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TopOrdersService } from './top-orders.service';

@Component({
    selector: 'app-top-orders',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './top-orders.component.html',
    styleUrl: './top-orders.component.scss'
})
export class TopOrdersComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private topOrdersService: TopOrdersService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.topOrdersService.loadChart();
    }

}