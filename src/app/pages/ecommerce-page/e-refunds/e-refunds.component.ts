import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-e-refunds',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, NgIf, NgClass, MatPaginatorModule],
    templateUrl: './e-refunds.component.html',
    styleUrl: './e-refunds.component.scss'
})
export class ERefundsComponent {

    displayedColumns: string[] = ['id', 'customer', 'date', 'noOrderReturned', 'noOrderRefunded', 'noOrderReplaced', 'totalRefunded', 'totalReplaced'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

export interface PeriodicElement {
    id: string;
    customer: any;
    date: string;
    noOrderReturned: number;
    noOrderRefunded: number;
    noOrderReplaced: number;
    totalRefunded: string;
    totalReplaced: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#999',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Oliver Khan'
        },
        date: '19 Jun 2024',
        noOrderReturned: 2,
        noOrderRefunded: 1,
        noOrderReplaced: 0,
        totalRefunded: '$42.00',
        totalReplaced: '$50.00'
    },
    {
        id: '#998',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Marcia Baker'
        },
        date: '19 Jun 2024',
        noOrderReturned: 1,
        noOrderRefunded: 1,
        noOrderReplaced: 0,
        totalRefunded: '$32.00',
        totalReplaced: '$54.00'
    },
    {
        id: '#997',
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Carolyn Barnes'
        },
        date: '20 Jun 2024',
        noOrderReturned: 2,
        noOrderRefunded: 7,
        noOrderReplaced: 4,
        totalRefunded: '$53.00',
        totalReplaced: '$67.00'
    },
    {
        id: '#996',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Donna Miller'
        },
        date: '21 Jun 2024',
        noOrderReturned: 3,
        noOrderRefunded: 1,
        noOrderReplaced: 2,
        totalRefunded: '$42.00',
        totalReplaced: '$56.00'
    },
    {
        id: '#995',
        customer: {
            img: 'images/users/user10.jpg',
            name: 'Barbara Cross'
        },
        date: '22 Jun 2024',
        noOrderReturned: 5,
        noOrderRefunded: 2,
        noOrderReplaced: 7,
        totalRefunded: '$24.00',
        totalReplaced: '$45.00'
    },
    {
        id: '#994',
        customer: {
            img: 'images/users/user11.jpg',
            name: 'Rebecca Block'
        },
        date: '23 Jun 2024',
        noOrderReturned: 5,
        noOrderRefunded: 6,
        noOrderReplaced: 2,
        totalRefunded: '$53.00',
        totalReplaced: '$56.00'
    },
    {
        id: '#993',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Ramiro McCarty'
        },
        date: '24 Jun 2024',
        noOrderReturned: 2,
        noOrderRefunded: 6,
        noOrderReplaced: 1,
        totalRefunded: '$52.00',
        totalReplaced: '$67.00'
    },
    {
        id: '#992',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Robert Fairweather'
        },
        date: '25 Jun 2024',
        noOrderReturned: 6,
        noOrderRefunded: 5,
        noOrderReplaced: 4,
        totalRefunded: '$42.00',
        totalReplaced: '$46.00'
    },
    {
        id: '#991',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Marcelino Haddock'
        },
        date: '26 Jun 2024',
        noOrderReturned: 7,
        noOrderRefunded: 2,
        noOrderReplaced: 5,
        totalRefunded: '$44.00',
        totalReplaced: '$68.00'
    },
    {
        id: '#990',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Thomas Wilson'
        },
        date: '27 Jun 2024',
        noOrderReturned: 5,
        noOrderRefunded: 1,
        noOrderReplaced: 6,
        totalRefunded: '$99.00',
        totalReplaced: '$742.00'
    },
    {
        id: '#990',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Thomas Wilson'
        },
        date: '27 Jun 2024',
        noOrderReturned: 5,
        noOrderRefunded: 1,
        noOrderReplaced: 6,
        totalRefunded: '$99.00',
        totalReplaced: '$742.00'
    },
    {
        id: '#991',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Marcelino Haddock'
        },
        date: '26 Jun 2024',
        noOrderReturned: 7,
        noOrderRefunded: 2,
        noOrderReplaced: 5,
        totalRefunded: '$44.00',
        totalReplaced: '$68.00'
    },
    {
        id: '#992',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Robert Fairweather'
        },
        date: '25 Jun 2024',
        noOrderReturned: 6,
        noOrderRefunded: 5,
        noOrderReplaced: 4,
        totalRefunded: '$42.00',
        totalReplaced: '$46.00'
    },
    {
        id: '#993',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Ramiro McCarty'
        },
        date: '24 Jun 2024',
        noOrderReturned: 2,
        noOrderRefunded: 6,
        noOrderReplaced: 1,
        totalRefunded: '$52.00',
        totalReplaced: '$67.00'
    },
    {
        id: '#994',
        customer: {
            img: 'images/users/user11.jpg',
            name: 'Rebecca Block'
        },
        date: '23 Jun 2024',
        noOrderReturned: 5,
        noOrderRefunded: 6,
        noOrderReplaced: 2,
        totalRefunded: '$53.00',
        totalReplaced: '$56.00'
    },
    {
        id: '#995',
        customer: {
            img: 'images/users/user10.jpg',
            name: 'Barbara Cross'
        },
        date: '22 Jun 2024',
        noOrderReturned: 5,
        noOrderRefunded: 2,
        noOrderReplaced: 7,
        totalRefunded: '$24.00',
        totalReplaced: '$45.00'
    },
    {
        id: '#996',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Donna Miller'
        },
        date: '21 Jun 2024',
        noOrderReturned: 3,
        noOrderRefunded: 1,
        noOrderReplaced: 2,
        totalRefunded: '$42.00',
        totalReplaced: '$56.00'
    },
    {
        id: '#997',
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Carolyn Barnes'
        },
        date: '20 Jun 2024',
        noOrderReturned: 2,
        noOrderRefunded: 7,
        noOrderReplaced: 4,
        totalRefunded: '$53.00',
        totalReplaced: '$67.00'
    },
    {
        id: '#998',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Marcia Baker'
        },
        date: '19 Jun 2024',
        noOrderReturned: 1,
        noOrderRefunded: 1,
        noOrderReplaced: 0,
        totalRefunded: '$32.00',
        totalReplaced: '$54.00'
    },
    {
        id: '#999',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Oliver Khan'
        },
        date: '19 Jun 2024',
        noOrderReturned: 2,
        noOrderRefunded: 1,
        noOrderReplaced: 0,
        totalRefunded: '$42.00',
        totalReplaced: '$50.00'
    }
];