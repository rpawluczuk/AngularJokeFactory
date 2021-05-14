import {BlockType} from './block-type';

export class Block {

    protected id: number = null;
    blockType: BlockType = null;
    title: string = null;
    description: string = null;
    position: number = null;

    constructor(position: number) {
        this.position = position;
    }
}
