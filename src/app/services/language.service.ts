import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private translate: TranslateService, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.translate.addLangs(["en", "th"]);
    this.translate.setDefaultLang("th");
  }

  async initializeLanguage(): Promise<void> {
    const savedLang = localStorage.getItem("languageCode") || this.translate.getBrowserLang();
    const defaultLang = savedLang?.match(/en|th/) ? savedLang : "th";
    await this.changeLanguage(defaultLang);
  }

  async changeLanguage(lang: string): Promise<void> {
    try {
      await this.loadTranslations(lang);
      localStorage.setItem("languageCode", lang);
      this.translate.use(lang);
      console.log(`Language changed to ${lang}`);
    } catch (error) {
      console.error(`Error changing language to ${lang}:`, error);
    }
  }

  getCurrentLanguage(): string {
    return localStorage.getItem("languageCode") || this.translate.currentLang || this.translate.getDefaultLang();
  }

  clearStorageData(): void {
    localStorage.removeItem("languageCode");
  }

  private async loadTranslations(lang: string): Promise<void> {
    try {
      const translations = await firstValueFrom(this.http.get(`assets/i18n/${lang}.json`));
      this.translate.setTranslation(lang, translations, true);
      console.log(`Translations loaded for ${lang}:`, translations);
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      throw error; // Re-throw to handle in changeLanguage
    }
  }
}
