import {OriginCreatorChildDto} from './originCreatorChildDto';

export class OriginCreatorDto {
  id: number;
  name: string;
  children: OriginCreatorChildDto[];

  constructor() {
    this.name = '';
    this.children = [];
  }
}
