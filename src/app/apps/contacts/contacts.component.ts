import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-contacts',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, NgIf, MatCheckboxModule, MatPaginatorModule],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

    displayedColumns: string[] = ['select', 'id', 'user', 'email', 'phone', 'lastContacted', 'company', 'leadScore', 'status', 'action'];
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user + 1}`;
    }

}

export interface PeriodicElement {
    id: string;
    user: any;
    email: string;
    phone: string;
    lastContacted: string;
    company: string;
    leadScore: number;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#854',
        user: {
            img: 'images/users/user6.jpg',
            name: 'Oliver Khan'
        },
        email: 'oliver@trezo.com',
        phone: '+1 555-123-4567',
        lastContacted: '19 Jun 2024',
        company: 'ABC Corporation',
        leadScore: 50,
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
        id: '#853',
        user: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'carolyn@trezo.com',
        phone: '+1 555-987-6543',
        lastContacted: '18 Jun 2024',
        company: 'XYZ Ltd',
        leadScore: 35,
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
        id: '#852',
        user: {
            img: 'images/users/user8.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@trezo.com',
        phone: '+1 555-456-7890',
        lastContacted: '17 Jun 2024',
        company: 'Tech Solutions',
        leadScore: 40,
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
        id: '#851',
        user: {
            img: 'images/users/user9.jpg',
            name: 'Barbara Cross'
        },
        email: 'barbara@trezo.com',
        phone: '+1 555-369-7878',
        lastContacted: '16 Jun 2024',
        company: 'Global Solutions',
        leadScore: 25,
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
        id: '#850',
        user: {
            img: 'images/users/user10.jpg',
            name: 'Rebecca Block'
        },
        email: 'rebecca@trezo.com',
        phone: '+1 555-658-4488',
        lastContacted: '15 Jun 2024',
        company: 'Acma Industries',
        leadScore: 27,
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
        id: '#849',
        user: {
            img: 'images/users/user11.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@trezo.com',
        phone: '+1 555-558-9966',
        lastContacted: '14 Jun 2024',
        company: 'Synergy Ltd',
        leadScore: 16,
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
        id: '#848',
        user: {
            img: 'images/users/user12.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@trezo.com',
        phone: '+1 555-357-5888',
        lastContacted: '13 Jun 2024',
        company: 'Summit Solutions',
        leadScore: 38,
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
        id: '#847',
        user: {
            img: 'images/users/user13.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'marcelino@trezo.com',
        phone: '+1 555-456-8877',
        lastContacted: '12 Jun 2024',
        company: 'Strategies Ltd',
        leadScore: 15,
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
        id: '#846',
        user: {
            img: 'images/users/user14.jpg',
            name: 'Thomas Wilson'
        },
        email: 'thomas@trezo.com',
        phone: '+1 555-622-4488',
        lastContacted: '11 Jun 2024',
        company: 'Tech Enterprises',
        leadScore: 41,
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
        id: '#845',
        user: {
            img: 'images/users/user15.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'nathaniel@trezo.com',
        phone: '+1 555-225-4488',
        lastContacted: '10 Jun 2024',
        company: 'Synetic Solutions',
        leadScore: 29,
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
        id: '#845',
        user: {
            img: 'images/users/user15.jpg',
            name: 'Nathaniel Hulsey'
        },
        email: 'nathaniel@trezo.com',
        phone: '+1 555-225-4488',
        lastContacted: '10 Jun 2024',
        company: 'Synetic Solutions',
        leadScore: 29,
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
        id: '#846',
        user: {
            img: 'images/users/user14.jpg',
            name: 'Thomas Wilson'
        },
        email: 'thomas@trezo.com',
        phone: '+1 555-622-4488',
        lastContacted: '11 Jun 2024',
        company: 'Tech Enterprises',
        leadScore: 41,
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
        id: '#847',
        user: {
            img: 'images/users/user13.jpg',
            name: 'Marcelino Haddock'
        },
        email: 'marcelino@trezo.com',
        phone: '+1 555-456-8877',
        lastContacted: '12 Jun 2024',
        company: 'Strategies Ltd',
        leadScore: 15,
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
        id: '#848',
        user: {
            img: 'images/users/user12.jpg',
            name: 'Robert Fairweather'
        },
        email: 'robert@trezo.com',
        phone: '+1 555-357-5888',
        lastContacted: '13 Jun 2024',
        company: 'Summit Solutions',
        leadScore: 38,
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
        id: '#849',
        user: {
            img: 'images/users/user11.jpg',
            name: 'Ramiro McCarty'
        },
        email: 'ramiro@trezo.com',
        phone: '+1 555-558-9966',
        lastContacted: '14 Jun 2024',
        company: 'Synergy Ltd',
        leadScore: 16,
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
        id: '#850',
        user: {
            img: 'images/users/user10.jpg',
            name: 'Rebecca Block'
        },
        email: 'rebecca@trezo.com',
        phone: '+1 555-658-4488',
        lastContacted: '15 Jun 2024',
        company: 'Acma Industries',
        leadScore: 27,
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
        id: '#851',
        user: {
            img: 'images/users/user9.jpg',
            name: 'Barbara Cross'
        },
        email: 'barbara@trezo.com',
        phone: '+1 555-369-7878',
        lastContacted: '16 Jun 2024',
        company: 'Global Solutions',
        leadScore: 25,
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
        id: '#852',
        user: {
            img: 'images/users/user8.jpg',
            name: 'Donna Miller'
        },
        email: 'donna@trezo.com',
        phone: '+1 555-456-7890',
        lastContacted: '17 Jun 2024',
        company: 'Tech Solutions',
        leadScore: 40,
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
        id: '#853',
        user: {
            img: 'images/users/user7.jpg',
            name: 'Carolyn Barnes'
        },
        email: 'carolyn@trezo.com',
        phone: '+1 555-987-6543',
        lastContacted: '18 Jun 2024',
        company: 'XYZ Ltd',
        leadScore: 35,
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
        id: '#854',
        user: {
            img: 'images/users/user6.jpg',
            name: 'Oliver Khan'
        },
        email: 'oliver@trezo.com',
        phone: '+1 555-123-4567',
        lastContacted: '19 Jun 2024',
        company: 'ABC Corporation',
        leadScore: 50,
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