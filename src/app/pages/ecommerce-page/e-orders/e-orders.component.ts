import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-e-orders',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './e-orders.component.html',
    styleUrl: './e-orders.component.scss'
})
export class EOrdersComponent {

    displayedColumns: string[] = ['orderID', 'customer', 'items', 'created', 'total', 'vendor', 'status', 'action'];
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

}

export interface PeriodicElement {
    orderID: string;
    customer: any;
    items: number;
    created: string;
    total: string;
    vendor: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        orderID: '#JAN-2345',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Sarah Johnson'
        },
        items: 120,
        created: '12 Jun 2024',
        total: '$10,490',
        vendor: 'Dennis Matthews',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-1323',
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Michael Smith'
        },
        items: 62,
        created: '11 Jun 2024',
        total: '$6,575',
        vendor: 'Kathryn Turner',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1234',
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Emily Brown'
        },
        items: 49,
        created: '10 Jun 2024',
        total: '$12,870',
        vendor: 'John Valdez',
        status: {
            confirmed: false,
            shipped: false,
            pending: true,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        items: 25,
        created: '09 Jun 2024',
        total: '$7,895',
        vendor: 'Douglas Harvey',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1098',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Ashley Davis'
        },
        items: 82,
        created: '08 Jun 2024',
        total: '$4,680',
        vendor: 'Susan Rader',
        status: {
            confirmed: false,
            shipped: false,
            pending: false,
            rejected: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-2345',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Sarah Johnson'
        },
        items: 120,
        created: '12 Jun 2024',
        total: '$10,490',
        vendor: 'Dennis Matthews',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-1323',
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Michael Smith'
        },
        items: 62,
        created: '11 Jun 2024',
        total: '$6,575',
        vendor: 'Kathryn Turner',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1234',
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Emily Brown'
        },
        items: 49,
        created: '10 Jun 2024',
        total: '$12,870',
        vendor: 'John Valdez',
        status: {
            confirmed: false,
            shipped: false,
            pending: true,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        items: 25,
        created: '09 Jun 2024',
        total: '$7,895',
        vendor: 'Douglas Harvey',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1098',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Ashley Davis'
        },
        items: 82,
        created: '08 Jun 2024',
        total: '$4,680',
        vendor: 'Susan Rader',
        status: {
            confirmed: false,
            shipped: false,
            pending: false,
            rejected: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-2345',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Sarah Johnson'
        },
        items: 120,
        created: '12 Jun 2024',
        total: '$10,490',
        vendor: 'Dennis Matthews',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-1323',
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Michael Smith'
        },
        items: 62,
        created: '11 Jun 2024',
        total: '$6,575',
        vendor: 'Kathryn Turner',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1234',
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Emily Brown'
        },
        items: 49,
        created: '10 Jun 2024',
        total: '$12,870',
        vendor: 'John Valdez',
        status: {
            confirmed: false,
            shipped: false,
            pending: true,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        items: 25,
        created: '09 Jun 2024',
        total: '$7,895',
        vendor: 'Douglas Harvey',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1098',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Ashley Davis'
        },
        items: 82,
        created: '08 Jun 2024',
        total: '$4,680',
        vendor: 'Susan Rader',
        status: {
            confirmed: false,
            shipped: false,
            pending: false,
            rejected: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-2345',
        customer: {
            img: 'images/users/user1.jpg',
            name: 'Sarah Johnson'
        },
        items: 120,
        created: '12 Jun 2024',
        total: '$10,490',
        vendor: 'Dennis Matthews',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#JAN-1323',
        customer: {
            img: 'images/users/user2.jpg',
            name: 'Michael Smith'
        },
        items: 62,
        created: '11 Jun 2024',
        total: '$6,575',
        vendor: 'Kathryn Turner',
        status: {
            confirmed: true,
            shipped: false,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1234',
        customer: {
            img: 'images/users/user3.jpg',
            name: 'Emily Brown'
        },
        items: 49,
        created: '10 Jun 2024',
        total: '$12,870',
        vendor: 'John Valdez',
        status: {
            confirmed: false,
            shipped: false,
            pending: true,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-3567',
        customer: {
            img: 'images/users/user4.jpg',
            name: 'Jason Lee'
        },
        items: 25,
        created: '09 Jun 2024',
        total: '$7,895',
        vendor: 'Douglas Harvey',
        status: {
            confirmed: false,
            shipped: true,
            pending: false,
            rejected: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        orderID: '#DEC-1098',
        customer: {
            img: 'images/users/user5.jpg',
            name: 'Ashley Davis'
        },
        items: 82,
        created: '08 Jun 2024',
        total: '$4,680',
        vendor: 'Susan Rader',
        status: {
            confirmed: false,
            shipped: false,
            pending: false,
            rejected: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];