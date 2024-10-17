import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgClass, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProductService } from '../../../services/product.service';
import { ProductDto } from '../../../shared/DTOs/ProductModel';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-e-products-list',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        MatTableModule,
        NgIf,
        NgClass,
        MatPaginatorModule,
    ],
    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss',
})
export class EProductsListComponent implements OnInit {
    displayedColumns: string[] = ['productid', 'productname', 'productpicture', 'categoryid', 'unitprice', 'unitinstock', 'action'];
    dataSource!: MatTableDataSource<ProductDto>;
    isToggled = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private productService: ProductService,
        private router: Router,
        private authService: AuthService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.loadProducts();
        } else {
            this.router.navigate(['/authentication/sign-in']);
        }
    }


    loadProducts() {
        this.productService.getProducts().subscribe(
            (response) => {
                this.dataSource = new MatTableDataSource(response.products);
                this.dataSource.paginator = this.paginator;
            },
            (error) => {
                console.error('Error fetching products:', error);
                if (error.status === 401) {
                    this.router.navigate(['/authentication/sign-in']);
                }
            }
        );
    }

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    deleteProduct(id: number) {
        this.productService.deleteProduct(id).subscribe(
            () => {
                this.loadProducts();
            },
            (error) => {
                console.error('Error deleting product:', error);
            }
        );
    }
}
