import {Block} from './block';
import {BlockType} from './block-type';

export class StandardBlock extends Block{

    constructor(position: number, title?: string) {
        super(position);
        super.blockType = BlockType.STANDARD_BLOCK;
        title ? this.setTitle(title) : this.setTitle('');
    }
}
