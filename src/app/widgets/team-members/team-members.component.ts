import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-team-members:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatProgressBarModule, NgIf],
    templateUrl: './team-members.component.html',
    styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent {

    displayedColumns: string[] = ['teamMember', 'tasks', 'status'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    teamMember: any;
    tasks: number;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        teamMember: {
            img: 'images/users/user6.jpg',
            name: 'Alex Davis',
            designation: 'Head of HR'
        },
        tasks: 55,
        status: {
            percentage: 55,
            primaryClassName: true,
            successClassName: false,
            orangeClassName: false,
            purpleClassName: false
        }
    },
    {
        teamMember: {
            img: 'images/users/user7.jpg',
            name: 'Laura Martinez',
            designation: 'laura@trezo.com'
        },
        tasks: 125,
        status: {
            percentage: 70,
            primaryClassName: false,
            successClassName: true,
            orangeClassName: false,
            purpleClassName: false
        }
    },
    {
        teamMember: {
            img: 'images/users/user8.jpg',
            name: 'Mark Thompson',
            designation: 'mark@trezo.com'
        },
        tasks: 78,
        status: {
            percentage: 30,
            primaryClassName: false,
            successClassName: false,
            orangeClassName: false,
            purpleClassName: true
        }
    },
    {
        teamMember: {
            img: 'images/users/user9.jpg',
            name: 'Rachel White',
            designation: 'rachel@trezo.com'
        },
        tasks: 95,
        status: {
            percentage: 90,
            primaryClassName: false,
            successClassName: false,
            orangeClassName: true,
            purpleClassName: false
        }
    },
    {
        teamMember: {
            img: 'images/users/user10.jpg',
            name: 'Kevin Lee',
            designation: 'kevin@trezo.com'
        },
        tasks: 134,
        status: {
            percentage: 50,
            primaryClassName: true,
            successClassName: false,
            orangeClassName: false,
            purpleClassName: false
        }
    }
];