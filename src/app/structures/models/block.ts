import {BlockType} from './block-type';
import {Structure} from './structure';

export class Block {

    protected id: number = null;
    blockType: BlockType = null;
    title: string = null;
    description: string = null;
    position: number = null;
    structure: Structure = null;

    constructor(position: number) {
        this.position = position;
    }
}
