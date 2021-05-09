import {Block} from './block';
import {StandardBlock} from './standard-block';
import {ActionBlock} from './action-block';
import {ArrowBlock} from './arrow-block';

export class BlockFactory {

    createStandardBlock(position: number): Block {
        return new StandardBlock(position);
    }

    createActionBlock(position: number): Block {
        return new ActionBlock(position);
    }

    createArrowBlock(position: number): Block {
        return new ArrowBlock(position);
    }
}
