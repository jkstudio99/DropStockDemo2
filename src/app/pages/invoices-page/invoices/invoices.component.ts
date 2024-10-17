import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-invoices',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatTooltipModule],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

    displayedColumns: string[] = ['invoiceID', 'customer', 'email', 'issuedDate', 'total', 'quantity', 'walletBalance', 'action'];
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
    invoiceID: string;
    customer: any;
    email: string;
    total: string;
    issuedDate: string;
    quantity: number;
    walletBalance: string;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        invoiceID: '#JAN-158',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@trezo.com',
        total: '$5,000',
        issuedDate: '10 Nov 2024',
        quantity: 6,
        walletBalance: '$2,000',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-325',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@trezo.com',
        total: '$8,750',
        issuedDate: '11 Nov 2024',
        quantity: 10,
        walletBalance: '$4,500',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-286',
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@trezo.com',
        total: '$3,200',
        issuedDate: '12 Nov 2024',
        quantity: 6,
        walletBalance: '$1,550',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-463',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@trezo.com',
        total: '$3,750',
        issuedDate: '13 Nov 2024',
        quantity: 4,
        walletBalance: '$2,490',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-998',
        customer: {
            img: 'images/users/user10.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@trezo.com',
        total: '$6,000',
        issuedDate: '14 Nov 2024',
        quantity: 2,
        walletBalance: '$3,599',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-436',
        customer: {
            img: 'images/users/user11.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@trezo.com',
        total: '$9,200',
        issuedDate: '13 Nov 2024',
        quantity: 8,
        walletBalance: '$5,800',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-860',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@trezo.com',
        total: '$2,500',
        issuedDate: '12 Nov 2024',
        quantity: 6,
        walletBalance: '$1,200',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-491',
        customer: {
            img: 'images/users/user13.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'haddock@trezo.com',
        total: '$7,300',
        issuedDate: '17 Nov 2024',
        quantity: 9,
        walletBalance: '$4,850',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-125',
        customer: {
            img: 'images/users/user14.jpg',
            name: 'Thomas Wilson'
        },
        email: 'wildon@trezo.com',
        total: '$4,800',
        issuedDate: '18 Nov 2024',
        quantity: 5,
        walletBalance: '$2,300',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-579',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'hulsey@trezo.com',
        total: '$6,500',
        issuedDate: '19 Nov 2024',
        quantity: 6,
        walletBalance: '$4,560',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-579',
        customer: {
            img: 'images/users/user15.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'hulsey@trezo.com',
        total: '$6,500',
        issuedDate: '19 Nov 2024',
        quantity: 6,
        walletBalance: '$4,560',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-125',
        customer: {
            img: 'images/users/user16.jpg',
            name: 'Thomas Wilson'
        },
        email: 'wildon@trezo.com',
        total: '$4,800',
        issuedDate: '18 Nov 2024',
        quantity: 5,
        walletBalance: '$2,300',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-491',
        customer: {
            img: 'images/users/user17.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'haddock@trezo.com',
        total: '$7,300',
        issuedDate: '17 Nov 2024',
        quantity: 9,
        walletBalance: '$4,850',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-860',
        customer: {
            img: 'images/users/user12.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@trezo.com',
        total: '$2,500',
        issuedDate: '16 Nov 2024',
        quantity: 6,
        walletBalance: '$1,200',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-436',
        customer: {
            img: 'images/users/user11.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@trezo.com',
        total: '$9,200',
        issuedDate: '15 Nov 2024',
        quantity: 8,
        walletBalance: '$5,800',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-998',
        customer: {
            img: 'images/users/user10.jpg',
            name: 'Rebecca Block'
        },
        email: 'block@trezo.com',
        total: '$6,000',
        issuedDate: '14 Nov 2024',
        quantity: 2,
        walletBalance: '$3,599',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-463',
        customer: {
            img: 'images/users/user9.jpg',
            name: 'Barbara Cross'
        },
        email: 'cross@trezo.com',
        total: '$3,750',
        issuedDate: '13 Nov 2024',
        quantity: 4,
        walletBalance: '$2,490',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-286',
        customer: {
            img: 'images/users/user8.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@trezo.com',
        total: '$3,200',
        issuedDate: '12 Nov 2024',
        quantity: 6,
        walletBalance: '$1,550',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-325',
        customer: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'barnes@trezo.com',
        total: '$8,750',
        issuedDate: '11 Nov 2024',
        quantity: 10,
        walletBalance: '$4,500',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    },
    {
        invoiceID: '#JAN-158',
        customer: {
            img: 'images/users/user6.jpg',
            name: 'Marcia Baker'
        },
        email: 'marcia@trezo.com',
        total: '$5,000',
        issuedDate: '10 Nov 2024',
        quantity: 6,
        walletBalance: '$2,000',
        action: {
            view: 'visibility',
            print: 'print',
            delete: 'delete'
        }
    }
];