import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-customer-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule],
    templateUrl: './e-customer-details.component.html',
    styleUrl: './e-customer-details.component.scss'
})
export class ECustomerDetailsComponent {

    displayedColumns: string[] = ['id', 'status', 'amount', 'rewards', 'date'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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
    id: string;
    status: any;
    amount: string;
    rewards: string;
    date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#JAN-121',
        status: {
            successful: false,
            pending: true,
            rejected: false
        },
        amount: '$6,855.00',
        rewards: '$12.00',
        date: '14 Jan 2024'
    },
    {
        id: '#JAN-120',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$258.00',
        rewards: '$9.00',
        date: '13 Jan 2024'
    },
    {
        id: '#JAN-119',
        status: {
            successful: false,
            pending: false,
            rejected: true
        },
        amount: '$3,890.00',
        rewards: '$11.00',
        date: '12 Jan 2024'
    },
    {
        id: '#JAN-118',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$2,500.00',
        rewards: '$23.42',
        date: '11 Jan 2024'
    },
    {
        id: '#JAN-117',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$8,200.00',
        rewards: '$10.84',
        date: '10 Jan 2024'
    },
    {
        id: '#JAN-116',
        status: {
            successful: false,
            pending: false,
            rejected: true
        },
        amount: '$640.00',
        rewards: '$3.21',
        date: '09 Jan 2024'
    },
    {
        id: '#JAN-115',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$9,100.00',
        rewards: '$43.21',
        date: '08 Jan 2024'
    },
    {
        id: '#JAN-114',
        status: {
            successful: false,
            pending: true,
            rejected: false
        },
        amount: '$7,300.00',
        rewards: '$42.42',
        date: '07 Jan 2024'
    },
    {
        id: '#JAN-113',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$2,800.00',
        rewards: '$11.21',
        date: '06 Jan 2024'
    },
    {
        id: '#JAN-112',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$6,600.00',
        rewards: '$14.32',
        date: '05 Jan 2024'
    },
    {
        id: '#JAN-112',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$6,600.00',
        rewards: '$14.32',
        date: '05 Jan 2024'
    },
    {
        id: '#JAN-113',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$2,800.00',
        rewards: '$11.21',
        date: '06 Jan 2024'
    },
    {
        id: '#JAN-113',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$2,800.00',
        rewards: '$11.21',
        date: '06 Jan 2024'
    },
    {
        id: '#JAN-114',
        status: {
            successful: false,
            pending: true,
            rejected: false
        },
        amount: '$7,300.00',
        rewards: '$42.42',
        date: '07 Jan 2024'
    },
    {
        id: '#JAN-115',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$9,100.00',
        rewards: '$43.21',
        date: '08 Jan 2024'
    },
    {
        id: '#JAN-116',
        status: {
            successful: false,
            pending: false,
            rejected: true
        },
        amount: '$640.00',
        rewards: '$3.21',
        date: '09 Jan 2024'
    },
    {
        id: '#JAN-117',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$8,200.00',
        rewards: '$10.84',
        date: '10 Jan 2024'
    },
    {
        id: '#JAN-118',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$2,500.00',
        rewards: '$23.42',
        date: '11 Jan 2024'
    },
    {
        id: '#JAN-119',
        status: {
            successful: false,
            pending: false,
            rejected: true
        },
        amount: '$3,890.00',
        rewards: '$11.00',
        date: '12 Jan 2024'
    },
    {
        id: '#JAN-120',
        status: {
            successful: true,
            pending: false,
            rejected: false
        },
        amount: '$258.00',
        rewards: '$9.00',
        date: '13 Jan 2024'
    }
];