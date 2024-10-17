import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dd-programmatically',
    standalone: true,
    imports: [CdkDrag, MatButtonModule],
    templateUrl: './dd-programmatically.component.html',
    styleUrl: './dd-programmatically.component.scss'
})
export class DdProgrammaticallyComponent {

    dragPosition = {x: 0, y: 0};

    changePosition() {
        this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
    }

}