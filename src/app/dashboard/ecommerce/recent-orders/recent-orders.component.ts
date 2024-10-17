import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-recent-orders',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './recent-orders.component.html',
    styleUrl: './recent-orders.component.scss'
})
export class RecentOrdersComponent {

    displayedColumns: string[] = ['orderID', 'customer', 'created', 'total', 'status'];
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
    customer: any;
    created: string;
    total: string;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        orderID: '#JAN-2345',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Sarah Johnson'
        },
        created: '12 Jun 2024',
        total: '$10,490',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        }
    },
    {
        orderID: '#JAN-1323',
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Michael Smith'
        },
        created: '11 Jun 2024',
        total: '$6,575',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        }
    },
    {
        orderID: '#DEC-1234',
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Emily Brown'
        },
        created: '10 Jun 2024',
        total: '$12,870',
        status: {
            confirmed: false,
            shipped: false,
            pending: true,
            rejected: false
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        created: '09 Jun 2024',
        total: '$7,895',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        }
    },
    {
        orderID: '#DEC-1098',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Ashley Davis'
        },
        created: '08 Jun 2024',
        total: '$4,680',
        status: {
            confirmed: false,
            shipped: false,
            pending: false,
            rejected: true
        }
    },
    {
        orderID: '#JAN-1323',
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Michael Smith'
        },
        created: '11 Jun 2024',
        total: '$6,575',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        }
    },
    {
        orderID: '#JAN-2345',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Sarah Johnson'
        },
        created: '12 Jun 2024',
        total: '$10,490',
        status: {
            confirmed: false,
            shipped: false,
            pending: false,
            rejected: true
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        created: '09 Jun 2024',
        total: '$7,895',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        }
    },
    {
        orderID: '#DEC-1234',
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Emily Brown'
        },
        created: '10 Jun 2024',
        total: '$12,870',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        created: '09 Jun 2024',
        total: '$7,895',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        }
    }
];