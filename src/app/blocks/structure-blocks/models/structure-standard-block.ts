import {StructureBlock} from './structure-block';
import {BlockType} from '../../models/block-type';

export class StructureStandardBlock extends StructureBlock{

    constructor(position: number, title?: string) {
        super(position);
        super.blockType = BlockType.STRUCTURE_STANDARD_BLOCK;
        title ? this.title = title : this.title = '';
    }
}
