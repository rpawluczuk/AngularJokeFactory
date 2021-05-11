import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Structure} from '../../models/structure';
import {Router} from '@angular/router';

@Component({
    selector: 'app-single-structure',
    templateUrl: './single-structure.component.html',
    styleUrls: ['./single-structure.component.css']
})
export class SingleStructureComponent implements OnInit {
    @Input() structure: Structure;
    @Output() removedStructure: EventEmitter<number> = new EventEmitter<number>();

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    removeStructure(structure: Structure, event) {
        event.stopPropagation();
        this.removedStructure.emit(structure.id);
    }

    goToStructureDetails(structure: Structure){
        this.router.navigate(['/structures', structure.id]);
    }
}
