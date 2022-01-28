import {TopicCreatorChildDto} from './topicCreatorChildDto';

export class TopicCreatorDto {
  id: number;
  name: string;
  children: TopicCreatorChildDto[];
  category: boolean;

  constructor() {
    this.name = '';
    this.children = [];
  }
}
