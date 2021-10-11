import {TopicCreatorChildDto} from './topicCreatorChildDto';

export class TopicCreatorDto {
  id: number;
  name: string;
  children: TopicCreatorChildDto[];

  constructor() {
    this.name = '';
    this.children = [];
  }
}
