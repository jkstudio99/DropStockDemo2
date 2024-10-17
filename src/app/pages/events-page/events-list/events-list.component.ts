import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-events-list',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule],
    templateUrl: './events-list.component.html',
    styleUrl: './events-list.component.scss'
})
export class EventsListComponent {

    displayedColumns: string[] = ['eventID', 'event', 'dateAndTime', 'location', 'organizer', 'status', 'action'];
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
    eventID: string;
    event: any;
    dateAndTime: string;
    location: string;
    organizer: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        eventID: '#JAN-258',
        event: {
            img: 'images/events/event1.jpg',
            title: 'Annual Conference 2024'
        },
        dateAndTime: '01 Dec 2024 09:00 AM',
        location: 'Convention Center',
        organizer: 'ABC Corporation',
        status: {
            happening: true,
            upcoming: false,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-648',
        event: {
            img: 'images/events/event2.jpg',
            title: 'Leadership Summit 2024'
        },
        dateAndTime: '10 Dec 2024 03:00 AM',
        location: 'Online',
        organizer: 'Marketing Pros',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-945',
        event: {
            img: 'images/events/event3.jpg',
            title: 'Product Launch Webinar'
        },
        dateAndTime: '15 Dec 2024 06:00 PM',
        location: 'City Sky Lounge',
        organizer: 'Tech Solutions Inc.',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-186',
        event: {
            img: 'images/events/event4.jpg',
            title: 'AI in Healthcare Symposium'
        },
        dateAndTime: '20 Dec 2024 09:00 AM',
        location: 'Training Center',
        organizer: 'Startup Hub',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-439',
        event: {
            img: 'images/events/event5.jpg',
            title: 'Tech Summit 2024'
        },
        dateAndTime: '25 Dec 2024 02:30 PM',
        location: 'Tech Park Auditorium',
        organizer: 'Community Foundation',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-752',
        event: {
            img: 'images/events/event6.jpg',
            title: 'Startup Pitch Day'
        },
        dateAndTime: '30 Dec 2024 11:00 AM',
        location: 'Grand Hotel Ballroom',
        organizer: 'FutureTech Solutions',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-658',
        event: {
            img: 'images/events/event7.jpg',
            title: 'Workshop: Digital Marketing'
        },
        dateAndTime: '01 Jan 2024 07:00 AM',
        location: 'Innovation Hub',
        organizer: 'Leadership Institute',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-951',
        event: {
            img: 'images/events/event8.jpg',
            title: 'Charity Gala Dinner'
        },
        dateAndTime: '10 Jan 2024 03:00PM',
        location: 'Medical Center',
        organizer: 'XYZ Innovations',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-357',
        event: {
            img: 'images/events/event9.jpg',
            title: 'Web Development Seminar'
        },
        dateAndTime: '20 Jan 2024 01:00 PM',
        location: 'Corporate HQ',
        organizer: 'DTech Institute',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-851',
        event: {
            img: 'images/events/event10.jpg',
            title: 'Networking Mixer'
        },
        dateAndTime: '30 Jan 2024 10:00 AM',
        location: 'Online',
        organizer: 'ABC Corporation',
        status: {
            happening: false,
            upcoming: true,
            past: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-851',
        event: {
            img: 'images/events/event10.jpg',
            title: 'Networking Mixer'
        },
        dateAndTime: '30 Jan 2024 10:00 AM',
        location: 'Online',
        organizer: 'ABC Corporation',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-357',
        event: {
            img: 'images/events/event9.jpg',
            title: 'Web Development Seminar'
        },
        dateAndTime: '20 Jan 2024 01:00 PM',
        location: 'Corporate HQ',
        organizer: 'DTech Institute',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-951',
        event: {
            img: 'images/events/event8.jpg',
            title: 'Charity Gala Dinner'
        },
        dateAndTime: '10 Jan 2024 03:00PM',
        location: 'Medical Center',
        organizer: 'XYZ Innovations',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-658',
        event: {
            img: 'images/events/event7.jpg',
            title: 'Workshop: Digital Marketing'
        },
        dateAndTime: '01 Jan 2024 07:00 AM',
        location: 'Innovation Hub',
        organizer: 'Leadership Institute',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-752',
        event: {
            img: 'images/events/event6.jpg',
            title: 'Startup Pitch Day'
        },
        dateAndTime: '30 Dec 2024 11:00 AM',
        location: 'Grand Hotel Ballroom',
        organizer: 'FutureTech Solutions',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-439',
        event: {
            img: 'images/events/event5.jpg',
            title: 'Tech Summit 2024'
        },
        dateAndTime: '25 Dec 2024 02:30 PM',
        location: 'Tech Park Auditorium',
        organizer: 'Community Foundation',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-186',
        event: {
            img: 'images/events/event4.jpg',
            title: 'AI in Healthcare Symposium'
        },
        dateAndTime: '20 Dec 2024 09:00 AM',
        location: 'Training Center',
        organizer: 'Startup Hub',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-945',
        event: {
            img: 'images/events/event3.jpg',
            title: 'Product Launch Webinar'
        },
        dateAndTime: '15 Dec 2024 06:00 PM',
        location: 'City Sky Lounge',
        organizer: 'Tech Solutions Inc.',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-648',
        event: {
            img: 'images/events/event2.jpg',
            title: 'Leadership Summit 2024'
        },
        dateAndTime: '10 Dec 2024 03:00 AM',
        location: 'Online',
        organizer: 'Marketing Pros',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        eventID: '#JAN-258',
        event: {
            img: 'images/events/event1.jpg',
            title: 'Annual Conference 2024'
        },
        dateAndTime: '01 Dec 2024 09:00 AM',
        location: 'Convention Center',
        organizer: 'ABC Corporation',
        status: {
            happening: false,
            upcoming: false,
            past: true
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];