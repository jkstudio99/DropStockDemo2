import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DeviceSessionsService } from './device-sessions.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-device-sessions',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './device-sessions.component.html',
    styleUrl: './device-sessions.component.scss'
})
export class DeviceSessionsComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private deviceSessionsService: DeviceSessionsService
    ) {}

    ngOnInit(): void {
        this.deviceSessionsService.loadChart();
    }

}