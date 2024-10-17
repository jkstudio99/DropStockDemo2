import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TicketsDueService } from './tickets-due.service';

@Component({
    selector: 'app-tickets-due:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './tickets-due.component.html',
    styleUrl: './tickets-due.component.scss'
})
export class TicketsDueComponent {

    constructor(
        private ticketsDueService: TicketsDueService
    ) {}

    ngOnInit(): void {
        this.ticketsDueService.loadChart();
    }

}