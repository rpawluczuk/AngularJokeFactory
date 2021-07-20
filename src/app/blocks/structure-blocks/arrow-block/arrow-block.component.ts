import {Component, Input, OnInit} from '@angular/core';
import {StructureArrowBlock} from '../models/structure-arrow-block';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-arrow-block',
    templateUrl: './arrow-block.component.html',
    styleUrls: ['./arrow-block.component.css']
})
export class ArrowBlockComponent implements OnInit {
    @Input() arrowBlock: StructureArrowBlock;
    faLongArrowAltDown = faLongArrowAltDown;

    constructor() {
    }

    ngOnInit(): void {
    }
}
