import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pd-manage-reviews',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, NgIf, NgFor, MatTooltipModule],
    templateUrl: './pd-manage-reviews.component.html',
    styleUrl: './pd-manage-reviews.component.scss'
})
export class PdManageReviewsComponent {

    displayedColumns: string[] = ['reviewer', 'ratings', 'date', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    reviewer: any;
    ratings: any;
    date: any;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
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