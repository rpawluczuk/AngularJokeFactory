import {BlockType} from './block-type';
import {Structure} from '../../../structures/models/structure';

export class Block {

    id: number = null;
    blockType: BlockType = null;
    title: string = null;
    description: string = null;
    position: number = null;
    structure: Structure = null;

    constructor(position: number) {
        this.position = position;
    }
}