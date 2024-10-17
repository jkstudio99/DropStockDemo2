import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-browser-used-by-users',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule],
    templateUrl: './browser-used-by-users.component.html',
    styleUrl: './browser-used-by-users.component.scss'
})
export class BrowserUsedByUsersComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['browser', 'users', 'sessions', 'bounce_rate', 'avgs_duration'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    browser: any;
    users: string;
    sessions: string;
    bounce_rate: string;
    avgs_duration: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        browser: {
            img: 'images/browsers/google-chrome.svg',
            name: 'Google Chrome'
        },
        users: '58.4%',
        sessions: '12,345',
        bounce_rate: '34.2%',
        avgs_duration: '3m 15s'
    },
    {
        browser: {
            img: 'images/browsers/safari.svg',
            name: 'Safari'
        },
        users: '25.1%',
        sessions: '5,289',
        bounce_rate: '40.5%',
        avgs_duration: '2m 45s'
    },
    {
        browser: {
            img: 'images/browsers/microsoft-edge.svg',
            name: 'Microsoft Edge'
        },
        users: '10.2%',
        sessions: '2,134',
        bounce_rate: '29.8%',
        avgs_duration: '4m 05s'
    },
    {
        browser: {
            img: 'images/browsers/mozilla-firefox.svg',
            name: 'Mozilla Firefox'
        },
        users: '4.3%',
        sessions: '897',
        bounce_rate: '38.0%',
        avgs_duration: '3m 00s'
    },
    {
        browser: {
            img: 'images/browsers/opera-mini.svg',
            name: 'Opera Mini'
        },
        users: '1.5%',
        sessions: '315',
        bounce_rate: '35.7%',
        avgs_duration: '2m 30s'
    },
    {
        browser: {
            img: 'images/browsers/others.svg',
            name: 'Others'
        },
        users: '0.5%',
        sessions: '105',
        bounce_rate: '42.1%',
        avgs_duration: '2m 10s'
    }
];