import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {Block} from '../../models/block';
import {BlankBlock} from '../../models/blank-block';
import {ArrowBlock} from '../../models/arrow-block';
import {DirectionType} from '../../models/direction-type';
import {StandardBlock} from '../../models/standard-block';

@Component({
    selector: 'app-standard-block',
    templateUrl: './standard-block.component.html',
    styleUrls: ['./standard-block.component.css']
})
export class StandardBlockComponent implements OnInit {
    @Input() inputBlocks: Block[][];
    @Input() standardBlock: StandardBlock;
    @Input() y: number;
    @Input() x: number;
    @Output() outputBlocks: EventEmitter<Block[][]> = new EventEmitter<Block[][]>();

    faArrowUp = faArrowUp;
    faArrowRight = faArrowRight;
    faArrowDown = faArrowDown;
    faArrowLeft = faArrowLeft;

    constructor() {
    }

    ngOnInit(): void {
    }

    upRequest(y: number, x: number) {
        if (y === 0) {
            this.up(y, x, new ArrowBlock(DirectionType.UP));
            this.up(y, x, new StandardBlock('Standard Block'));
        } else {
            this.up(y, x, new ArrowBlock(DirectionType.UP));
            this.up(y - 1, x, new StandardBlock('Standard Block'));
        }
        this.outputBlocks.emit(this.inputBlocks);
    }

    up(y: number, x: number, block: Block) {
        if (this.inputBlocks[y - 1]) {
            this.inputBlocks[y - 1][x] = block;
        } else {
            const newRow: Block[] = [];
            this.inputBlocks[y].forEach(() => newRow.push(new BlankBlock()));
            newRow.splice(x, 1, block);
            this.inputBlocks.splice(0, 0, newRow);
        }
    }

    downRequest(y: number, x: number) {
        this.down(y, x, new ArrowBlock(DirectionType.DOWN));
        this.down(y + 1, x, new StandardBlock('Standard Block'));
        this.outputBlocks.emit(this.inputBlocks);
    }

    down(y: number, x: number, block: Block) {
        if (this.inputBlocks[y + 1]) {
            this.inputBlocks[y + 1][x] = block;
        } else {
            const newRow: Block[] = [];
            this.inputBlocks[y].forEach(() => newRow.push(new BlankBlock()));
            newRow.splice(x, 1, block);
            this.inputBlocks.splice(y + 1, 0, newRow);
        }
    }

    leftRequest(y: number, x: number) {
        this.left(y, x, new ArrowBlock(DirectionType.LEFT));
        this.left(y, x - 1, new StandardBlock('Standard Block'));
        this.outputBlocks.emit(this.inputBlocks);
    }

    left(y: number, x: number, block: Block) {
        if (x > 0) {
            this.inputBlocks[y][x - 1] = block;
        } else {
            this.inputBlocks.forEach(row => row.splice(0, 0, new BlankBlock()));
            this.inputBlocks[y].splice(0, 1, block);
        }
    }

    rightRequest(y: number, x: number) {
        this.right(y, x, new ArrowBlock(DirectionType.LEFT));
        this.right(y, x + 1, new StandardBlock('Standard Block'));
        this.outputBlocks.emit(this.inputBlocks);
    }

    right(y: number, x: number, block: Block) {
        if (x + 1 !== this.inputBlocks[y].length) {
            this.inputBlocks[y][x + 1] = block;
        } else {
            this.inputBlocks.forEach(row => row.push(new BlankBlock()));
            this.inputBlocks[y].splice(x + 1, 1, block);
        }
    }
}
