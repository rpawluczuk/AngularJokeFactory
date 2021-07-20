import {StructureBlock} from './structure-block';
import {BlockType} from '../../models/block-type';

export class ActionBlock extends StructureBlock{

    constructor(position: number) {
        super(position);
        super.blockType = BlockType.ACTION_BLOCK;
    }
}
