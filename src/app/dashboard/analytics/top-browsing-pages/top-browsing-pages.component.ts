import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-top-browsing-pages',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule],
    templateUrl: './top-browsing-pages.component.html',
    styleUrl: './top-browsing-pages.component.scss'
})
export class TopBrowsingPagesComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    private _liveAnnouncer = inject(LiveAnnouncer);
    displayedColumns: string[] = ['page_url', 'source', 'avg_time', 'page_views', 'bounce_rate'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

}

export interface PeriodicElement {
    page_url: string;
    source: string;
    avg_time: string;
    page_views: string;
    bounce_rate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        page_url: '/dashboard-overview',
        source: 'Organic',
        avg_time: '3m 45s',
        page_views: '350',
        bounce_rate: '30.5%'
    },
    {
        page_url: '/custom-reports/generate',
        source: 'Paid',
        avg_time: '7m 00s',
        page_views: '400',
        bounce_rate: '24.9%'
    },
    {
        page_url: '/export-data',
        source: 'Direct',
        avg_time: '2m 30s',
        page_views: '125',
        bounce_rate: '50.0%'
    },
    {
        page_url: '/realtime-users',
        source: 'Referral',
        avg_time: '3m 00s',
        page_views: '190',
        bounce_rate: '40.2%'
    },
    {
        page_url: '/account-preferences',
        source: 'Organic',
        avg_time: '2m 50s',
        page_views: '180',
        bounce_rate: '42.1%'
    },
    {
        page_url: '/apis-and-reports',
        source: 'Paid',
        avg_time: '4m 15s',
        page_views: '320',
        bounce_rate: '28.7%'
    },
    {
        page_url: '/apis-and-reports',
        source: 'Paid',
        avg_time: '4m 15s',
        page_views: '320',
        bounce_rate: '28.7%'
    },
    {
        page_url: '/account-preferences',
        source: 'Organic',
        avg_time: '2m 50s',
        page_views: '180',
        bounce_rate: '42.1%'
    },
    {
        page_url: '/realtime-users',
        source: 'Referral',
        avg_time: '3m 00s',
        page_views: '190',
        bounce_rate: '40.2%'
    },
    {
        page_url: '/export-data',
        source: 'Direct',
        avg_time: '2m 30s',
        page_views: '125',
        bounce_rate: '50.0%'
    },
    {
        page_url: '/custom-reports/generate',
        source: 'Paid',
        avg_time: '7m 00s',
        page_views: '400',
        bounce_rate: '24.9%'
    },
    {
        page_url: '/dashboard-overview',
        source: 'Organic',
        avg_time: '3m 45s',
        page_views: '350',
        bounce_rate: '30.5%'
    }
];