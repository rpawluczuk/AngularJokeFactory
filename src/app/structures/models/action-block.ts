import {Block} from './block';
import {BlockType} from './block-type';

export class ActionBlock extends Block{

    constructor(position: number) {
        super(position);
        super.blockType = BlockType.ACTION_BLOCK;
    }
}
