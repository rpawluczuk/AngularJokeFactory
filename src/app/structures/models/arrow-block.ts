import {Block} from './block';
import {DirectionType} from './direction-type';

export class ArrowBlock extends Block {
    direction: DirectionType;

    constructor(direction: DirectionType) {
        super();
        this.direction = direction;
    }
}
