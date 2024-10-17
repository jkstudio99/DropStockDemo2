import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-fp-faq',
    standalone: true,
    imports: [RouterLink, MatExpansionModule],
    templateUrl: './fp-faq.component.html',
    styleUrl: './fp-faq.component.scss'
})
export class FpFaqComponent {

    readonly panelOpenState = signal(false);

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

}