import {BlockType} from './blockType';

export class Block {
    text: string;
    type: BlockType;


    constructor(text: string, type: BlockType) {
        this.text = text;
        this.type = type;
    }
}
