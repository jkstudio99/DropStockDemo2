import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-order-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatTableModule],
    templateUrl: './e-order-details.component.html',
    styleUrl: './e-order-details.component.scss'
})
export class EOrderDetailsComponent {

    displayedColumns: string[] = ['orderID', 'product', 'items', 'price', 'total'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

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

export interface PeriodicElement {
    orderID: string;
    product: any;
    items: number;
    price: string;
    total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        orderID: '#JAN-2345',
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band',
            date: '08 Jun 2024'
        },
        items: 1,
        price: '$80.00',
        total: '$80.00',
    },
    {
        orderID: '#JAN-1323',
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone',
            date: '07 Jun 2024'
        },
        items: 3,
        price: '$150.00',
        total: '$450.00'
    },
    {
        orderID: '#DEC-1234',
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus',
            date: '06 Jun 2024'
        },
        items: 1,
        price: '$750.00',
        total: '$750.00'
    },
    {
        orderID: '#DEC-3567',
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker',
            date: '05 Jun 2024'
        },
        items: 5,
        price: '$15.00',
        total: '$75.00'
    },
    {
        orderID: '#DEC-1098',
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen',
            date: '04 Jun 2024'
        },
        items: 2,
        price: '$25.00',
        total: '$50.00'
    }
];