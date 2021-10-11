import {TopicCreatorChildDto} from './topicCreatorChildDto';

export class TopicCreatorChildrenWithParentId {

  parentId: number;
  topicCreatorChildren: TopicCreatorChildDto[] = [];

  constructor(topicCreatorChildren: TopicCreatorChildDto[], parentId: number) {
    this.parentId = parentId;
    this.topicCreatorChildren = topicCreatorChildren;
  }
}
