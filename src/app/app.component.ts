import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, TranslateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'DropStock - Simplifying Inventory, One Drop at a Time.';

    constructor(
        private router: Router,
        private viewportScroller: ViewportScroller,
        private translate: TranslateService,
        private languageService: LanguageService,
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        console.log('TranslateService:', this.translate);
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });

        this.translate.addLangs(['en', 'th']);
        this.translate.setDefaultLang('en');
    }

    async ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            await this.languageService.initializeLanguage();
        }
    }

    changeLanguage(lang: string) {
        console.log('Changing language to:', lang);
        this.translate.use(lang);
        localStorage.setItem('preferredLanguage', lang);
    }

    clearStorageData() {
        localStorage.clear();
        sessionStorage.clear();
        console.log('Storage cleared');
    }
}
