import {Block} from './block';
import {DirectionType} from './direction-type';

export class BlankBlock extends Block{
    direction: DirectionType;

    constructor(direction?: DirectionType) {
        super();
        this.direction = direction ? direction : DirectionType.NONE;
    }
}
