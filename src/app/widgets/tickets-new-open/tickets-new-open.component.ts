import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TicketsNewOpenService } from './tickets-new-open.service';

@Component({
    selector: 'app-tickets-new-open:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './tickets-new-open.component.html',
    styleUrl: './tickets-new-open.component.scss'
})
export class TicketsNewOpenComponent {

    constructor(
        private ticketsNewOpenService: TicketsNewOpenService
    ) {}

    ngOnInit(): void {
        this.ticketsNewOpenService.loadChart();
    }

}