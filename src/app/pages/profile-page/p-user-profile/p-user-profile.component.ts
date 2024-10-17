import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-p-user-profile',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf, NgFor],
    templateUrl: './p-user-profile.component.html',
    styleUrl: './p-user-profile.component.scss'
})
export class PUserProfileComponent {

    displayedColumns: string[] = ['id', 'projectName', 'client', 'assignees', 'budget', 'startDate', 'endDate', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

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
    projectName: string;
    client: string;
    assignees: any;
    budget: string;
    startDate: string;
    endDate: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#854',
        projectName: 'Project CyberSphere',
        client: 'NovaTech Solutions',
        assignees: {
            images: [
                {
                    img: 'images/users/user15.jpg'
                },
                {
                    img: 'images/users/user11.jpg'
                },
                {
                    img: 'images/users/user6.jpg'
                },
                {
                    img: 'images/users/user9.jpg'
                }
            ],
            number: '+10'
        },
        budget: '$4,500',
        startDate: '25 Mar 2024',
        endDate: '25 Apr 2024',
        status: {
            finished: true,
            inProgress: false,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#853',
        projectName: 'Digital Oasis Initiative',
        client: 'AlphaWave Innovations',
        assignees: {
            images: [
                {
                    img: 'images/users/user7.jpg'
                },
                {
                    img: 'images/users/user8.jpg'
                },
                {
                    img: 'images/users/user9.jpg'
                }
            ],
            number: '+04'
        },
        budget: '$6,800',
        startDate: '20 Mar 2024',
        endDate: '20 Apr 2024',
        status: {
            finished: false,
            inProgress: true,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#852',
        projectName: 'CloudScape Evolution',
        client: 'InnovateIQ Inc.',
        assignees: {
            images: [
                {
                    img: 'images/users/user10.jpg'
                },
                {
                    img: 'images/users/user12.jpg'
                }
            ],
            number: '+07'
        },
        budget: '$2,500',
        startDate: '15 Mar 2024',
        endDate: '15 Apr 2024',
        status: {
            finished: false,
            inProgress: false,
            pending: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#851',
        projectName: 'Data Dynamo Drive',
        client: 'BlueSky Technologies',
        assignees: {
            images: [
                {
                    img: 'images/users/user13.jpg'
                },
                {
                    img: 'images/users/user14.jpg'
                },
                {
                    img: 'images/users/user15.jpg'
                },
                {
                    img: 'images/users/user12.jpg'
                }
            ],
            number: '+15'
        },
        budget: '$7,500',
        startDate: '10 Mar 2024',
        endDate: '10 Apr 2024',
        status: {
            finished: false,
            inProgress: true,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#849',
        projectName: 'QuantumLeap Quest',
        client: 'NexGen Systems',
        assignees: {
            images: [
                {
                    img: 'images/users/user7.jpg'
                },
                {
                    img: 'images/users/user9.jpg'
                },
                {
                    img: 'images/users/user6.jpg'
                }
            ],
            number: '+03'
        },
        budget: '$3,400',
        startDate: '05 Mar 2024',
        endDate: '05 Apr 2024',
        status: {
            finished: true,
            inProgress: false,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#849',
        projectName: 'QuantumLeap Quest',
        client: 'NexGen Systems',
        assignees: {
            images: [
                {
                    img: 'images/users/user7.jpg'
                },
                {
                    img: 'images/users/user9.jpg'
                },
                {
                    img: 'images/users/user6.jpg'
                }
            ],
            number: '+03'
        },
        budget: '$3,400',
        startDate: '05 Mar 2024',
        endDate: '05 Apr 2024',
        status: {
            finished: true,
            inProgress: false,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#851',
        projectName: 'Data Dynamo Drive',
        client: 'BlueSky Technologies',
        assignees: {
            images: [
                {
                    img: 'images/users/user13.jpg'
                },
                {
                    img: 'images/users/user14.jpg'
                },
                {
                    img: 'images/users/user15.jpg'
                },
                {
                    img: 'images/users/user12.jpg'
                }
            ],
            number: '+15'
        },
        budget: '$7,500',
        startDate: '10 Mar 2024',
        endDate: '10 Apr 2024',
        status: {
            finished: false,
            inProgress: true,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#853',
        projectName: 'Digital Oasis Initiative',
        client: 'AlphaWave Innovations',
        assignees: {
            images: [
                {
                    img: 'images/users/user7.jpg'
                },
                {
                    img: 'images/users/user8.jpg'
                },
                {
                    img: 'images/users/user9.jpg'
                }
            ],
            number: '+04'
        },
        budget: '$6,800',
        startDate: '20 Mar 2024',
        endDate: '20 Apr 2024',
        status: {
            finished: false,
            inProgress: true,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#854',
        projectName: 'Project CyberSphere',
        client: 'NovaTech Solutions',
        assignees: {
            images: [
                {
                    img: 'images/users/user15.jpg'
                },
                {
                    img: 'images/users/user11.jpg'
                },
                {
                    img: 'images/users/user6.jpg'
                },
                {
                    img: 'images/users/user9.jpg'
                }
            ],
            number: '+10'
        },
        budget: '$4,500',
        startDate: '25 Mar 2024',
        endDate: '25 Apr 2024',
        status: {
            finished: true,
            inProgress: false,
            pending: false
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    },
    {
        id: '#852',
        projectName: 'CloudScape Evolution',
        client: 'InnovateIQ Inc.',
        assignees: {
            images: [
                {
                    img: 'images/users/user10.jpg'
                },
                {
                    img: 'images/users/user12.jpg'
                }
            ],
            number: '+07'
        },
        budget: '$2,500',
        startDate: '15 Mar 2024',
        endDate: '15 Apr 2024',
        status: {
            finished: false,
            inProgress: false,
            pending: true,
        },
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete'
        }
    }
];