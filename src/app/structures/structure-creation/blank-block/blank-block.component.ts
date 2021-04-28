import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DirectionType} from '../../models/direction-type';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {BlankBlock} from '../../models/blank-block';
import {ArrowBlock} from '../../models/arrow-block';
import {StandardBlock} from '../../models/standard-block';
import {Block} from '../../models/block';

@Component({
  selector: 'app-blank-block',
  templateUrl: './blank-block.component.html',
  styleUrls: ['./blank-block.component.css']
})
export class BlankBlockComponent implements OnInit {
  @Input() inputBlocks: Block[][];
  @Input() blankBlock: BlankBlock;
  @Input() y: number;
  @Input() x: number;
  @Output() outputBlocks: EventEmitter<Block[][]> = new EventEmitter<Block[][]>();
  faArrowUp = faArrowUp;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  directionType = DirectionType;

  constructor() {
  }

  ngOnInit(): void {
  }

  upRequest(y: number, x: number) {
    this.up(y + 1, x, new ArrowBlock(DirectionType.UP));
    this.up(y, x, new StandardBlock('Standard Block'));
    this.up(y, x, new BlankBlock(DirectionType.UP));
    this.right(y + 1, x, new BlankBlock(DirectionType.RIGHT));
    this.left(y + 1, x, new BlankBlock(DirectionType.LEFT));
    this.outputBlocks.emit(this.inputBlocks);
  }

  rightRequest(y: number, x: number) {
    this.right(y, x - 1, new ArrowBlock(DirectionType.RIGHT));
    this.right(y, x, new StandardBlock('Standard Block'));
    this.right(y, x + 1, new BlankBlock(DirectionType.RIGHT));
    this.up(y, x + 1, new BlankBlock(DirectionType.UP));
    this.down(y, x + 1, new BlankBlock(DirectionType.DOWN));
    this.outputBlocks.emit(this.inputBlocks);
  }

  downRequest(y: number, x: number) {
    this.down(y - 1, x, new ArrowBlock(DirectionType.DOWN));
    this.down(y, x, new StandardBlock('Standard Block'));
    this.down(y + 1, x, new BlankBlock(DirectionType.DOWN));
    this.right(y + 1, x, new BlankBlock(DirectionType.RIGHT));
    this.left(y + 1, x, new BlankBlock(DirectionType.LEFT));
    this.outputBlocks.emit(this.inputBlocks);
  }

  leftRequest(y: number, x: number) {
    this.left(y, x + 1, new ArrowBlock(DirectionType.LEFT));
    this.left(y, x, new StandardBlock('Standard Block'));
    this.left(y, x, new BlankBlock(DirectionType.LEFT));
    this.up(y, x + 1, new BlankBlock(DirectionType.UP));
    this.down(y, x + 1, new BlankBlock(DirectionType.DOWN));
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

  right(y: number, x: number, block: Block) {
    if (x + 1 !== this.inputBlocks[y].length) {
      this.inputBlocks[y][x + 1] = block;
    } else {
      this.inputBlocks.forEach(row => row.push(new BlankBlock()));
      this.inputBlocks[y].splice(x + 1, 1, block);
    }
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

  left(y: number, x: number, block: Block) {
    if (x > 0) {
      this.inputBlocks[y][x - 1] = block;
    } else {
      this.inputBlocks.forEach(row => row.splice(0, 0, new BlankBlock()));
      this.inputBlocks[y].splice(0, 1, block);
    }
  }
}
