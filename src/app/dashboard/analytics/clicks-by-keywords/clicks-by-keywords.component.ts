import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-clicks-by-keywords',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './clicks-by-keywords.component.html',
    styleUrl: './clicks-by-keywords.component.scss'
})
export class ClicksByKeywordsComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['id', 'dimension', 'impressions', 'clicks'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    id: string;
    dimension: string;
    impressions: any;
    clicks: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '1',
        dimension: 'data metrics',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '949'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '656'
        }
    },
    {
        id: '2',
        dimension: 'sales metrics',
        impressions: {
            upIcon: false,
            downIcon: true,
            number: '842'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '420'
        }
    },
    {
        id: '3',
        dimension: 'analytics dashboard',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '640'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '534'
        }
    },
    {
        id: '4',
        dimension: 'saas metrics',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '865'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '560'
        }
    },
    {
        id: '5',
        dimension: 'hubspot analytics',
        impressions: {
            upIcon: false,
            downIcon: true,
            number: '435'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '328'
        }
    },
    {
        id: '6',
        dimension: 'smart goals',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '756'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '235'
        }
    },
    {
        id: '7',
        dimension: 'google analytics',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '578'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '456'
        }
    },
    {
        id: '8',
        dimension: 'trezo dashboard',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '660'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '478'
        }
    },
    {
        id: '9',
        dimension: 'trezo dashboard',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '660'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '478'
        }
    },
    {
        id: '10',
        dimension: 'google analytics',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '578'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '456'
        }
    },
    {
        id: '11',
        dimension: 'smart goals',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '756'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '235'
        }
    },
    {
        id: '12',
        dimension: 'hubspot analytics',
        impressions: {
            upIcon: false,
            downIcon: true,
            number: '435'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '328'
        }
    },
    {
        id: '13',
        dimension: 'saas metrics',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '865'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '560'
        }
    },
    {
        id: '14',
        dimension: 'analytics dashboard',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '640'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '534'
        }
    },
    {
        id: '15',
        dimension: 'sales metrics',
        impressions: {
            upIcon: false,
            downIcon: true,
            number: '842'
        },
        clicks: {
            upIcon: true,
            downIcon: false,
            number: '420'
        }
    },
    {
        id: '16',
        dimension: 'data metrics',
        impressions: {
            upIcon: true,
            downIcon: false,
            number: '949'
        },
        clicks: {
            upIcon: false,
            downIcon: true,
            number: '656'
        }
    }
];