import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import {Block} from '../../models/block';
import {BlockType} from '../../models/blockType';

@Component({
    selector: 'app-standard-block',
    templateUrl: './standard-block.component.html',
    styleUrls: ['./standard-block.component.css']
})
export class StandardBlockComponent implements OnInit {
    @Input() inputBlocks: Block[][];
    @Input() block: Block;
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
            this.up(y, x, BlockType.ARRROW_UP);
            this.up(y, x, BlockType.STANDARD);
        } else {
            this.up(y, x, BlockType.ARRROW_UP);
            this.up(y - 1, x, BlockType.STANDARD);
        }
        this.outputBlocks.emit(this.inputBlocks);
    }

    up(y: number, x: number, blockType: BlockType) {
        if (this.inputBlocks[y - 1]) {
            this.inputBlocks[y - 1][x] = new Block('Up Block', blockType);
        } else {
            const newRow: Block[] = [];
            this.inputBlocks[y].forEach(() => newRow.push(new Block('Blank Block', BlockType.BLANK)));
            newRow.splice(x, 1, new Block('Up Block', blockType));
            this.inputBlocks.splice(0, 0, newRow);
        }
    }

    downRequest(y: number, x: number) {
        this.down(y, x, BlockType.ARRROW_DOWN);
        this.down(y + 1, x, BlockType.STANDARD);
        this.outputBlocks.emit(this.inputBlocks);
    }

    down(y: number, x: number, blockType: BlockType) {
        if (this.inputBlocks[y + 1]) {
            this.inputBlocks[y + 1][x] = new Block('Down Block', blockType);
        } else {
            const newRow: Block[] = [];
            this.inputBlocks[y].forEach(() => newRow.push(new Block('Blank Block', BlockType.BLANK)));
            newRow.splice(x, 1, new Block('Down Block', blockType));
            this.inputBlocks.splice(y + 1, 0, newRow);
        }
    }

    leftRequest(y: number, x: number) {
        this.left(y, x, BlockType.ARRROW_LEFT);
        this.left(y, x - 1, BlockType.STANDARD);
        this.outputBlocks.emit(this.inputBlocks);
    }

    left(y: number, x: number, blockType: BlockType) {
        if (x > 0) {
            this.inputBlocks[y][x - 1] = new Block('Left Block', blockType);
        } else {
            this.inputBlocks.forEach(row => row.splice(0, 0, new Block('Blank Block', BlockType.BLANK)));
            this.inputBlocks[y].splice(0, 1, new Block('Left Block', blockType));
        }
    }

    rightRequest(y: number, x: number) {
        this.right(y, x, BlockType.ARRROW_RIGHT);
        this.right(y, x + 1, BlockType.STANDARD);
        this.outputBlocks.emit(this.inputBlocks);
    }

    right(y: number, x: number, blockType: BlockType) {
        if (x + 1 !== this.inputBlocks[y].length) {
            this.inputBlocks[y][x + 1] = new Block('Right Block', blockType);
        } else {
            this.inputBlocks.forEach(row => row.push(new Block('Blank Block', BlockType.BLANK)));
            this.inputBlocks[y].splice(x + 1, 1, new Block('Right Block', blockType));
        }
    }
}
