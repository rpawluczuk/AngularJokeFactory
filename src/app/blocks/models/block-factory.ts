import {StructureBlock} from '../structure-blocks/models/structure-block';
import {StructureStandardBlock} from '../structure-blocks/models/structure-standard-block';
import {ActionBlock} from '../structure-blocks/models/action-block';
import {StructureArrowBlock} from '../structure-blocks/models/structure-arrow-block';
import {JokeBlock} from '../joke-blocks/models/joke-block';

export class BlockFactory {

  createStandardBlock(position: number): StructureBlock {
    return new StructureStandardBlock(position);
  }

  createActionBlock(position: number): StructureBlock {
    return new ActionBlock(position);
  }

  createArrowBlock(position: number): StructureBlock {
    return new StructureArrowBlock(position);
  }

  createJokeBlock(structureBlock: StructureBlock): JokeBlock {
    return new JokeBlock(structureBlock);
  }
}
