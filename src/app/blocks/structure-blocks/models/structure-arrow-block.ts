import {StructureBlock} from './structure-block';
import {BlockType} from '../../models/block-type';

export class StructureArrowBlock extends StructureBlock{

    constructor(position: number) {
        super(position);
        super.blockType = BlockType.ARROW_BLOCK;
    }
}
