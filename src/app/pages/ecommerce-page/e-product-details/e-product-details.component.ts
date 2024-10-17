import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { QuantityCounterComponent } from './quantity-counter/quantity-counter.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PdManageReviewsComponent } from './pd-manage-reviews/pd-manage-reviews.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgClass, NgFor } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-product-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, QuantityCounterComponent, MatTabsModule, MatProgressBarModule, CarouselModule, NgFor, NgClass, PdManageReviewsComponent],
    templateUrl: './e-product-details.component.html',
    styleUrl: './e-product-details.component.scss'
})
export class EProductDetailsComponent {

    // Product Images
    productImages = [
        {
            url: 'images/products/product-details1.jpg'
        },
        {
            url: 'images/products/product-details2.jpg'
        },
        {
            url: 'images/products/product-details3.jpg'
        }
    ]
    selectedImage: string = this.productImages[0].url;
    changeImage(image: string) {
        this.selectedImage = image;
    }

    // Product Types
    typeText: string = 'Apple M1 Pro Chip';
    typeActiveButton: string = 'second';
    setTypeTextToFirst() {
        this.typeText = 'Apple M1 Max Chip';
        this.typeActiveButton = 'first';
    }
    setTypeTextToSecond() {
        this.typeText = 'Apple M1 Pro Chip';
        this.typeActiveButton = 'second';
    }

    // Capacity
    capacityText: string = '1 TB';
    capacityActiveButton: string = 'second';
    setCapacityTextToFirst() {
        this.capacityText = '512 GB';
        this.capacityActiveButton = 'first';
    }
    setCapacityTextToSecond() {
        this.capacityText = '1 TB';
        this.capacityActiveButton = 'second';
    }

    // Color
    colorText: string = 'Silver';
    colorActiveButton: string = 'first';
    setColorTextToFirst() {
        this.colorText = 'Silver';
        this.colorActiveButton = 'first';
    }
    setColorTextToSecond() {
        this.colorText = 'Gray';
        this.colorActiveButton = 'second';
    }

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