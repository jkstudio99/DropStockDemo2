import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { RealtimeActiveUsersService } from './realtime-active-users.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-realtime-active-users',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './realtime-active-users.component.html',
    styleUrl: './realtime-active-users.component.scss'
})
export class RealtimeActiveUsersComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private realtimeActiveUsersService: RealtimeActiveUsersService
    ) {}

    ngOnInit(): void {
        this.realtimeActiveUsersService.loadChart();
    }

}