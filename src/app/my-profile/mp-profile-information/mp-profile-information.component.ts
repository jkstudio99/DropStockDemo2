import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mp-profile-information',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './mp-profile-information.component.html',
    styleUrl: './mp-profile-information.component.scss'
})
export class MpProfileInformationComponent {}