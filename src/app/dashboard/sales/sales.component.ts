import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { RecentEarningsComponent } from './recent-earnings/recent-earnings.component';
import { SalesByLocationsComponent } from './sales-by-locations/sales-by-locations.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { RealTimeSalesComponent } from './real-time-sales/real-time-sales.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { GrossEarningsComponent } from './gross-earnings/gross-earnings.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-sales',
    standalone: true,
    imports: [MatCardModule, StatsComponent, RecentEarningsComponent, SalesByLocationsComponent, TransactionHistoryComponent, RecentOrdersComponent, RealTimeSalesComponent, SalesOverviewComponent, GrossEarningsComponent],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.scss'
})
export class SalesComponent {}