import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReturningCustomerRateService } from './returning-customer-rate.service';

@Component({
    selector: 'app-returning-customer-rate',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './returning-customer-rate.component.html',
    styleUrl: './returning-customer-rate.component.scss'
})
export class ReturningCustomerRateComponent {

    constructor(
        private returningCustomerRateService: ReturningCustomerRateService
    ) {}

    ngOnInit(): void {
        this.returningCustomerRateService.loadChart();
    }

}