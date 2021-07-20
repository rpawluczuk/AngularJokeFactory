import {Block} from './block';
import {BlockType} from './block-type';

export class ArrowBlock extends Block{

    constructor(position: number) {
        super(position);
        super.blockType = BlockType.ARROW_BLOCK;
    }
}
