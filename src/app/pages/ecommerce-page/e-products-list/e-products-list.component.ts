import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgClass, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-products-list',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        MatTableModule,
        NgIf,
        NgClass,
        MatPaginatorModule,
    ],
    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss',
})
export class EProductsListComponent {
    displayedColumns: string[] = [
        'id',
        'product',
        'category',
        'price',
        'order',
        'stock',
        'amount',
        'rating',
        'status',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // isToggled
    isToggled = false;

    constructor(public themeService: CustomizerSettingsService) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }
}

export interface PeriodicElement {
    id: string;
    product: any;
    category: string;
    price: string;
    order: number;
    stock: any;
    amount: string;
    rating: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#JAN-999',
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band',
            date: '08 Jun 2024',
        },
        category: 'Watch',
        price: '$35.00',
        order: 75,
        stock: {
            count: '750',
            className: false,
        },
        amount: '$2,625',
        rating: '5.00 (141 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-998',
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone',
            date: '07 Jun 2024',
        },
        category: 'Electronics',
        price: '$49.00',
        order: 25,
        stock: {
            count: '825',
            className: false,
        },
        amount: '$1,225',
        rating: '5.00 (69 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-997',
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus',
            date: '06 Jun 2024',
        },
        category: 'Apple',
        price: '$99.00',
        order: 55,
        stock: {
            count: 'Stock Out',
            className: true,
        },
        amount: '$5,445',
        rating: '5.00 (99 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-996',
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker',
            date: '05 Jun 2024',
        },
        category: 'Google',
        price: '$59.00',
        order: 40,
        stock: {
            count: '535',
            className: false,
        },
        amount: '$2,360',
        rating: '4.00 (75 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-995',
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen',
            date: '04 Jun 2024',
        },
        category: 'Headphone',
        price: '$79.00',
        order: 56,
        stock: {
            count: '460',
            className: false,
        },
        amount: '$4,424',
        rating: '5.00 (158 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-999',
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band',
            date: '08 Jun 2024',
        },
        category: 'Watch',
        price: '$35.00',
        order: 75,
        stock: {
            count: '750',
            className: false,
        },
        amount: '$2,625',
        rating: '5.00 (141 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-998',
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone',
            date: '07 Jun 2024',
        },
        category: 'Electronics',
        price: '$49.00',
        order: 25,
        stock: {
            count: '825',
            className: false,
        },
        amount: '$1,225',
        rating: '5.00 (69 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-997',
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus',
            date: '06 Jun 2024',
        },
        category: 'Apple',
        price: '$99.00',
        order: 55,
        stock: {
            count: 'Stock Out',
            className: true,
        },
        amount: '$5,445',
        rating: '5.00 (99 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-996',
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker',
            date: '05 Jun 2024',
        },
        category: 'Google',
        price: '$59.00',
        order: 40,
        stock: {
            count: '535',
            className: false,
        },
        amount: '$2,360',
        rating: '4.00 (75 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-995',
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen',
            date: '04 Jun 2024',
        },
        category: 'Headphone',
        price: '$79.00',
        order: 56,
        stock: {
            count: '460',
            className: false,
        },
        amount: '$4,424',
        rating: '5.00 (158 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-999',
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band',
            date: '08 Jun 2024',
        },
        category: 'Watch',
        price: '$35.00',
        order: 75,
        stock: {
            count: '750',
            className: false,
        },
        amount: '$2,625',
        rating: '5.00 (141 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-998',
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone',
            date: '07 Jun 2024',
        },
        category: 'Electronics',
        price: '$49.00',
        order: 25,
        stock: {
            count: '825',
            className: false,
        },
        amount: '$1,225',
        rating: '5.00 (69 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-997',
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus',
            date: '06 Jun 2024',
        },
        category: 'Apple',
        price: '$99.00',
        order: 55,
        stock: {
            count: 'Stock Out',
            className: true,
        },
        amount: '$5,445',
        rating: '5.00 (99 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-996',
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker',
            date: '05 Jun 2024',
        },
        category: 'Google',
        price: '$59.00',
        order: 40,
        stock: {
            count: '535',
            className: false,
        },
        amount: '$2,360',
        rating: '4.00 (75 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-995',
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen',
            date: '04 Jun 2024',
        },
        category: 'Headphone',
        price: '$79.00',
        order: 56,
        stock: {
            count: '460',
            className: false,
        },
        amount: '$4,424',
        rating: '5.00 (158 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-999',
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band',
            date: '08 Jun 2024',
        },
        category: 'Watch',
        price: '$35.00',
        order: 75,
        stock: {
            count: '750',
            className: false,
        },
        amount: '$2,625',
        rating: '5.00 (141 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-998',
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone',
            date: '07 Jun 2024',
        },
        category: 'Electronics',
        price: '$49.00',
        order: 25,
        stock: {
            count: '825',
            className: false,
        },
        amount: '$1,225',
        rating: '5.00 (69 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-997',
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus',
            date: '06 Jun 2024',
        },
        category: 'Apple',
        price: '$99.00',
        order: 55,
        stock: {
            count: 'Stock Out',
            className: true,
        },
        amount: '$5,445',
        rating: '5.00 (99 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-996',
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker',
            date: '05 Jun 2024',
        },
        category: 'Google',
        price: '$59.00',
        order: 40,
        stock: {
            count: '535',
            className: false,
        },
        amount: '$2,360',
        rating: '4.00 (75 reviews)',
        status: {
            published: true,
            draft: false,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
    {
        id: '#JAN-995',
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen',
            date: '04 Jun 2024',
        },
        category: 'Headphone',
        price: '$79.00',
        order: 56,
        stock: {
            count: '460',
            className: false,
        },
        amount: '$4,424',
        rating: '5.00 (158 reviews)',
        status: {
            published: false,
            draft: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
    },
];
