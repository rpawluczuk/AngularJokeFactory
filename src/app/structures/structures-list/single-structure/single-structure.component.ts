import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Structure} from '../../models/structure';
import {Router} from '@angular/router';
import {BlockType} from '../../models/block-type';

@Component({
    selector: 'app-single-structure',
    templateUrl: './single-structure.component.html',
    styleUrls: ['./single-structure.component.css']
})
export class SingleStructureComponent implements OnInit {
    @Input() structure: Structure;
    @Output() removedStructure: EventEmitter<number> = new EventEmitter<number>();

    isDetailsButtonClicked: boolean;
    blockType = BlockType;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.isDetailsButtonClicked = false;
    }

    removeStructure(structure: Structure, event) {
        event.stopPropagation();
        this.removedStructure.emit(structure.id);
    }

    goToStructureEdition() {
        this.router.navigate(['/structures', this.structure.id]);
    }

    showStructureDetails() {
        this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
    }
}
