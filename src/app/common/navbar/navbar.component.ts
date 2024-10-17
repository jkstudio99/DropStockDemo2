import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgClass, NgIf],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Navbar Left/Right Button
    @ViewChild('scrollContent', { static: false }) scrollContent!: ElementRef;
    scrollDistance!: number;
    showScrollButtons: boolean = false;  // Controls visibility of both buttons
    constructor(private cdRef: ChangeDetectorRef) {}
    ngAfterViewInit() {
        this.calculateScrollDistance();
        this.updateScrollButtons();
        // Trigger change detection manually to avoid ExpressionChangedAfterItHasBeenCheckedError
        this.cdRef.detectChanges();
    }
    // Calculate the scroll distance based on the container width
    calculateScrollDistance() {
        this.scrollDistance = this.scrollContent.nativeElement.clientWidth;
    }
    // Check if scroll buttons should be visible
    updateScrollButtons() {
        const scrollWidth = this.scrollContent.nativeElement.scrollWidth;
        const clientWidth = this.scrollContent.nativeElement.clientWidth;
        // Show both buttons if the content is scrollable (i.e., scrollWidth > clientWidth)
        this.showScrollButtons = scrollWidth > clientWidth;
    }
    scrollLeft() {
        this.scrollContent.nativeElement.scrollBy({
            left: -this.scrollDistance,
            behavior: 'smooth'
        });
        // Update button visibility after scroll
        setTimeout(() => this.updateScrollButtons(), 300);
    }
    scrollRight() {
        this.scrollContent.nativeElement.scrollBy({
            left: this.scrollDistance,
            behavior: 'smooth'
        });
        // Update button visibility after scroll
        setTimeout(() => this.updateScrollButtons(), 300);
    }
    // Recalculate and update button visibility on window resize
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.calculateScrollDistance();
        this.updateScrollButtons();
    }
    // Update button visibility on content scroll
    @HostListener('window:scroll', ['$event'])
    onScroll() {
        this.updateScrollButtons();
    }

}