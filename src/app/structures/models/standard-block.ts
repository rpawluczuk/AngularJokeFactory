import {Block} from './block';

export class StandardBlock extends Block {
    name: string;
    private xPosition: number;
    private yPosition: number;

    constructor(text: string) {
        super();
        this.name = text;
    }


    getXPosition(): number {
        return this.xPosition;
    }

    setXPosition(value: number) {
        this.xPosition = value;
    }

    getYPosition(): number {
        return this.yPosition;
    }

    setYPosition(value: number) {
        this.yPosition = value;
    }
}
