import {Block} from './block';
import {BlockType} from './block-type';

export class ArrowBlock extends Block {

  constructor() {
    super();
    this.blockType = BlockType.ARROW_BLOCK;
  }
}
