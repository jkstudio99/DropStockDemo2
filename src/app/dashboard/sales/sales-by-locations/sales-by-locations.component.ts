import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-sales-by-locations',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, NgIf],
    templateUrl: './sales-by-locations.component.html',
    styleUrl: './sales-by-locations.component.scss'
})
export class SalesByLocationsComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['country', 'orders', 'earnings'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    country: any;
    orders: string;
    earnings: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        country: {
            img: 'images/flags/usa.svg',
            name: 'USA'
        },
        orders: '22,124',
        earnings: '$250.4k'
    },
    {
        country: {
            img: 'images/flags/germany.svg',
            name: 'Germany'
        },
        orders: '18,320',
        earnings: '$180.3k'
    },
    {
        country: {
            img: 'images/flags/uk.svg',
            name: 'UK'
        },
        orders: '12,560',
        earnings: '$125.6k'
    },
    {
        country: {
            img: 'images/flags/canada.svg',
            name: 'Canada'
        },
        orders: '8,720',
        earnings: '$94.1k'
    }
];