import {Block} from '../../models/block';
import {StructureBlock} from '../../structure-blocks/models/structure-block';
import {BlockType} from '../../models/block-type';

export class JokeBlock extends Block {

  content: string = null;
  structureBlock: StructureBlock = null;

  constructor(structureBlock: StructureBlock) {
    super();
    this.blockType = BlockType.JOKE_BLOCK;
    this.structureBlock = structureBlock;
  }
}
