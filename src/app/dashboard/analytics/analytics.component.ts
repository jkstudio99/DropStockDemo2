import { Component } from '@angular/core';
import { AnalyticsOverviewComponent } from './analytics-overview/analytics-overview.component';
import { RealtimeActiveUsersComponent } from './realtime-active-users/realtime-active-users.component';
import { StatsComponent } from './stats/stats.component';
import { BrowserUsedByUsersComponent } from './browser-used-by-users/browser-used-by-users.component';
import { DeviceSessionsComponent } from './device-sessions/device-sessions.component';
import { ClicksComponent } from './clicks/clicks.component';
import { ImpressionsComponent } from './impressions/impressions.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionsByChannelComponent } from './sessions-by-channel/sessions-by-channel.component';
import { ClicksByKeywordsComponent } from './clicks-by-keywords/clicks-by-keywords.component';
import { TopBrowsingPagesComponent } from './top-browsing-pages/top-browsing-pages.component';
import { UsersByCountryComponent } from './users-by-country/users-by-country.component';

@Component({
    selector: 'app-analytics',
    standalone: true,
    imports: [AnalyticsOverviewComponent, RealtimeActiveUsersComponent, StatsComponent, BrowserUsedByUsersComponent, DeviceSessionsComponent, ClicksComponent, ImpressionsComponent, SessionsComponent, SessionsByChannelComponent, ClicksByKeywordsComponent, TopBrowsingPagesComponent, UsersByCountryComponent],
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {}