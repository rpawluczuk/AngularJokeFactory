import {Block} from './block';

export class StandardBlock extends Block {
    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }
}
