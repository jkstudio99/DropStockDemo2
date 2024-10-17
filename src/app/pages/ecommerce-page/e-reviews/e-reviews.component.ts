import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-e-reviews',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, NgIf, NgClass, MatPaginatorModule, MatTooltipModule],
    templateUrl: './e-reviews.component.html',
    styleUrl: './e-reviews.component.scss'
})
export class EReviewsComponent {

    displayedColumns: string[] = ['id', 'reviewer', 'ratings', 'product', 'date', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

export interface PeriodicElement {
    id: string;
    reviewer: any;
    ratings: any;
    product: any;
    date: any;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#999',
        reviewer: {
            img: 'images/users/user6.jpg',
            name: 'Olivia Clark',
            email: 'olivia@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
        },
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#998',
        reviewer: {
            img: 'images/users/user7.jpg',
            name: 'Zephyr Zing',
            email: 'zephyr@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            review: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.`
        },
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#997',
        reviewer: {
            img: 'images/users/user8.jpg',
            name: 'Nova Nectar',
            email: 'nova@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
        },
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#996',
        reviewer: {
            img: 'images/users/user9.jpg',
            name: 'Isabella Chang',
            email: 'isabella@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.`
        },
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#995',
        reviewer: {
            img: 'images/users/user10.jpg',
            name: 'Alina Bennett',
            email: 'alina@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
        },
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: false,
            published: true
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#994',
        reviewer: {
            img: 'images/users/user11.jpg',
            name: 'Marcia Baker',
            email: 'marcia@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
        },
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#993',
        reviewer: {
            img: 'images/users/user12.jpg',
            name: 'Carolyn Barnes',
            email: 'carolyn@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            review: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.`
        },
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#992',
        reviewer: {
            img: 'images/users/user13.jpg',
            name: 'Donna Miller',
            email: 'donna@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
        },
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#991',
        reviewer: {
            img: 'images/users/user14.jpg',
            name: 'Barbara Cross',
            email: 'barbara@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.`
        },
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#990',
        reviewer: {
            img: 'images/users/user15.jpg',
            name: 'Rebecca Block',
            email: 'rebecca@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
        },
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: false,
            published: true
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#990',
        reviewer: {
            img: 'images/users/user15.jpg',
            name: 'Rebecca Block',
            email: 'rebecca@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
        },
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: false,
            published: true
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#991',
        reviewer: {
            img: 'images/users/user14.jpg',
            name: 'Barbara Cross',
            email: 'barbara@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.`
        },
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#992',
        reviewer: {
            img: 'images/users/user13.jpg',
            name: 'Donna Miller',
            email: 'donna@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
        },
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#993',
        reviewer: {
            img: 'images/users/user12.jpg',
            name: 'Carolyn Barnes',
            email: 'carolyn@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            review: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.`
        },
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#994',
        reviewer: {
            img: 'images/users/user11.jpg',
            name: 'Marcia Baker',
            email: 'marcia@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
        },
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#995',
        reviewer: {
            img: 'images/users/user10.jpg',
            name: 'Alina Bennett',
            email: 'alina@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
        },
        product: {
            img: 'images/products/product5.jpg',
            title: 'Airbuds 2nd Gen'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: false,
            published: true
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#996',
        reviewer: {
            img: 'images/users/user9.jpg',
            name: 'Isabella Chang',
            email: 'isabella@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.`
        },
        product: {
            img: 'images/products/product4.jpg',
            title: 'Bluetooth Speaker'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#997',
        reviewer: {
            img: 'images/users/user8.jpg',
            name: 'Nova Nectar',
            email: 'nova@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-line'
                }
            ],
            review: `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
        },
        product: {
            img: 'images/products/product3.jpg',
            title: 'iPhone 15 Plus'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#998',
        reviewer: {
            img: 'images/users/user7.jpg',
            name: 'Zephyr Zing',
            email: 'zephyr@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-half-fill'
                }
            ],
            review: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.`
        },
        product: {
            img: 'images/products/product2.jpg',
            title: 'Headphone'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    },
    {
        id: '#999',
        reviewer: {
            img: 'images/users/user6.jpg',
            name: 'Olivia Clark',
            email: 'olivia@trezo.com'
        },
        ratings: {
            stars: [
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                },
                {
                    star: 'ri-star-fill'
                }
            ],
            review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
        },
        product: {
            img: 'images/products/product1.jpg',
            title: 'Smart Band'
        },
        date: {
            date: '17 Dec 2024',
            time: '08:30 PM'
        },
        status: {
            pending: true,
            published: false
        },
        action: {
            approved: 'download_done',
            delete: 'delete',
            reply: 'reply'
        }
    }
];