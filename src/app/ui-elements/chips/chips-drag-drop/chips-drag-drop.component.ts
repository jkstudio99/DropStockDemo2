import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, signal} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

export interface Vegetable {
    name: string;
}

@Component({
    selector: 'app-chips-drag-drop',
    standalone: true,
    imports: [MatChipsModule, CdkDropList, CdkDrag],
    templateUrl: './chips-drag-drop.component.html',
    styleUrl: './chips-drag-drop.component.scss'
})
export class ChipsDragDropComponent {

    readonly vegetables = signal<Vegetable[]>([
        {name: 'apple'},
        {name: 'banana'},
        {name: 'strawberry'},
        {name: 'orange'},
        {name: 'kiwi'},
        {name: 'cherry'},
    ]);

    drop(event: CdkDragDrop<Vegetable[]>) {
        this.vegetables.update(vegetables => {
            moveItemInArray(vegetables, event.previousIndex, event.currentIndex);
            return [...vegetables];
        });
    }

}