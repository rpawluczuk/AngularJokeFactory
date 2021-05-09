import {BlockType} from './block-type';

export class Block {

    protected id: number = null;
    protected blockType: BlockType = null;
    private title: string = null;
    protected description: string = null;
    protected position: number = null;

    constructor(position: number) {
        this.position = position;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getPosition(): number {
        return this.position;
    }

    getBlockType(): string {
        return this.blockType;
    }


    setTitle(title: string) {
        this.title = title;
    }
}
