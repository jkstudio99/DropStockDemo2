import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-e-customers',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf, NgFor],
    templateUrl: './e-customers.component.html',
    styleUrl: './e-customers.component.scss'
})
export class ECustomersComponent {

    displayedColumns: string[] = ['id', 'customer', 'email', 'phone', 'lastLogin', 'totalSpend', 'totalOrders', 'status', 'action'];
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
    id: string;
    customer: any;
    email: string;
    phone: string;
    lastLogin: string;
    totalSpend: string;
    totalOrders: number;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#JAN-854',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Oliver Khan'
        },
        email: 'oliver@trezo.com',
        phone: '+1 555-123-4567',
        lastLogin: '10 Oct 2024',
        totalSpend: '$6,855.00',
        totalOrders: 125,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-853',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'carolyn@trezo.com',
        phone: '+1 555-987-6543',
        lastLogin: '11 Sep 2024',
        totalSpend: '$2,800.00',
        totalOrders: 99,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-852',
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@trezo.com',
        phone: '+1 555-456-7890',
        lastLogin: '12 Aug 2024',
        totalSpend: '$258.00',
        totalOrders: 145,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-851',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Barbara Cross'
        },
        email: 'barbara@trezo.com',
        phone: '+1 555-369-7878',
        lastLogin: '13 Jul 2024',
        totalSpend: '$3,890.00',
        totalOrders: 279,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-850',
        customer: {
            img: 'images/users/user10.jpg',
            name: 'Rebecca Block'
        },
        email: 'rebecca@trezo.com',
        phone: '+1 555-658-4488',
        lastLogin: '14 Jun 2024',
        totalSpend: '$2,500.00',
        totalOrders: 169,
        status: {
            active: false,
            deactive: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-849',
        customer: {
            img: 'images/users/user11.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@trezo.com',
        phone: '+1 555-558-9966',
        lastLogin: '15 May 2024',
        totalSpend: '$8,200.00',
        totalOrders: 46,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-848',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@trezo.com',
        phone: '+1 555-357-5888',
        lastLogin: '16 Apr 2024',
        totalSpend: '$640.00',
        totalOrders: 184,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-847',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'marcelino@trezo.com',
        phone: '+1 555-456-8877',
        lastLogin: '17 Mar 2024',
        totalSpend: '$9,100.00',
        totalOrders: 166,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-846',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Thomas Wilson'
        },
        email: 'thomas@trezo.com',
        phone: '+1 555-622-4488',
        lastLogin: '18 Feb 2024',
        totalSpend: '$7,300.00',
        totalOrders: 75,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-845',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'nathaniel@trezo.com',
        phone: '+1 555-225-4488',
        lastLogin: '19 Jan 2024',
        totalSpend: '$6,600.00',
        totalOrders: 55,
        status: {
            active: false,
            deactive: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-845',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'nathaniel@trezo.com',
        phone: '+1 555-225-4488',
        lastLogin: '19 Jan 2024',
        totalSpend: '$6,600.00',
        totalOrders: 55,
        status: {
            active: false,
            deactive: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-846',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Thomas Wilson'
        },
        email: 'thomas@trezo.com',
        phone: '+1 555-622-4488',
        lastLogin: '18 Feb 2024',
        totalSpend: '$7,300.00',
        totalOrders: 75,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-847',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'marcelino@trezo.com',
        phone: '+1 555-456-8877',
        lastLogin: '17 Mar 2024',
        totalSpend: '$9,100.00',
        totalOrders: 166,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-848',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@trezo.com',
        phone: '+1 555-357-5888',
        lastLogin: '16 Apr 2024',
        totalSpend: '$640.00',
        totalOrders: 184,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-849',
        customer: {
            img: 'images/users/user11.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@trezo.com',
        phone: '+1 555-558-9966',
        lastLogin: '15 May 2024',
        totalSpend: '$8,200.00',
        totalOrders: 46,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-850',
        customer: {
            img: 'images/users/user10.jpg',
            name: 'Rebecca Block'
        },
        email: 'rebecca@trezo.com',
        phone: '+1 555-658-4488',
        lastLogin: '14 Jun 2024',
        totalSpend: '$2,500.00',
        totalOrders: 169,
        status: {
            active: false,
            deactive: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-851',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Barbara Cross'
        },
        email: 'barbara@trezo.com',
        phone: '+1 555-369-7878',
        lastLogin: '13 Jul 2024',
        totalSpend: '$3,890.00',
        totalOrders: 279,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-852',
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@trezo.com',
        phone: '+1 555-456-7890',
        lastLogin: '12 Aug 2024',
        totalSpend: '$258.00',
        totalOrders: 145,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-853',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'carolyn@trezo.com',
        phone: '+1 555-987-6543',
        lastLogin: '11 Sep 2024',
        totalSpend: '$2,800.00',
        totalOrders: 99,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#JAN-854',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Oliver Khan'
        },
        email: 'oliver@trezo.com',
        phone: '+1 555-123-4567',
        lastLogin: '10 Oct 2024',
        totalSpend: '$6,855.00',
        totalOrders: 125,
        status: {
            active: true,
            deactive: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];