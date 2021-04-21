import {Component, Input, OnInit} from '@angular/core';
import {ArrowBlock} from '../../models/arrow-block';
import {faLongArrowAltDown, faLongArrowAltLeft, faLongArrowAltRight, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {DirectionType} from '../../models/direction-type';

@Component({
    selector: 'app-arrow-block',
    templateUrl: './arrow-block.component.html',
    styleUrls: ['./arrow-block.component.css']
})
export class ArrowBlockComponent implements OnInit {
    @Input() arrowBlock: ArrowBlock;
    faLongArrowAltUp = faLongArrowAltUp;
    faLongArrowAltRight = faLongArrowAltRight;
    faLongArrowAltDown = faLongArrowAltDown;
    faLongArrowAltLeft = faLongArrowAltLeft;
    directionType = DirectionType;

    constructor() {
    }

    ngOnInit(): void {
    }
}
