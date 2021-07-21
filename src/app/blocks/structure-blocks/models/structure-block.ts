import {Structure} from '../../../structures/models/structure';

export class StructureBlock {

  id: number = null;
  title: string = null;
  description: string = null;
  position: number = null;
  structure: Structure = null;

  constructor(position: number) {
    this.position = position;
  }
}
