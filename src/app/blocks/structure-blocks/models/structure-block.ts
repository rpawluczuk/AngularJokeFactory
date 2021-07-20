import {Structure} from '../../../structures/models/structure';
import {Block} from '../../models/block';

export class StructureBlock extends Block {

  title: string = null;
  description: string = null;
  position: number = null;
  structure: Structure = null;

  constructor(position: number) {
    super();
    this.position = position;
  }
}
