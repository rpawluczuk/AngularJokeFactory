import {OriginCreatorChildDto} from './originCreatorChildDto';

export class OriginCreatorChildrenWithParentId {

  parentId: number;
  originCreatorChildren: OriginCreatorChildDto[] = [];

  constructor(originCreatorChildren: OriginCreatorChildDto[], parentId: number) {
    this.parentId = parentId;
    this.originCreatorChildren = originCreatorChildren;
  }
}
