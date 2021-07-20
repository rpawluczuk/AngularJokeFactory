import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {StructureBlock} from '../models/structure-block';
import {BlockFactory} from '../../models/block-factory';

@Component({
    selector: 'app-blank-block',
    templateUrl: './action-block.component.html',
    styleUrls: ['./action-block.component.css']
})
export class ActionBlockComponent implements OnInit {
    @Input() inputBlocks: StructureBlock[];
    @Input() actionBlock: StructureBlock;
    @Output() outputBlocks: EventEmitter<StructureBlock[]> = new EventEmitter<StructureBlock[]>();
    faArrowDown = faArrowDown;
    private blockFactory = new BlockFactory();

    constructor() {
    }

    ngOnInit(): void {
    }

    downRequest(position: number) {
        this.down(this.blockFactory.createArrowBlock(position));
        this.down(this.blockFactory.createStandardBlock(position + 1));
        this.down(this.blockFactory.createActionBlock(position + 2));
        this.outputBlocks.emit(this.inputBlocks);
    }

    down(block: StructureBlock) {
        if (block.position === this.inputBlocks.length - 1) {
            this.inputBlocks[block.position] = block;
        } else {
            this.inputBlocks.push(block);
        }
    }
}
