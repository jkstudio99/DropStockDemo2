import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-dwe-backdrop-setting',
    standalone: true,
    imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
    templateUrl: './dwe-backdrop-setting.component.html',
    styleUrl: './dwe-backdrop-setting.component.scss'
})
export class DweBackdropSettingComponent {}