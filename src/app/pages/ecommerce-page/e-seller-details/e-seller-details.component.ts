import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SellerOverviewComponent } from './seller-overview/seller-overview.component';
import { RevenueComponent } from './revenue/revenue.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsComponent } from './products/products.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-seller-details',
    standalone: true,
    imports: [RouterLink, SellerOverviewComponent, RevenueComponent, MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, ProductsComponent],
    templateUrl: './e-seller-details.component.html',
    styleUrl: './e-seller-details.component.scss'
})
export class ESellerDetailsComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

}