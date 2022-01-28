export class TopicCreatorChildDto {
  id: number;
  name: string;
  categories: string;
  parentId: number;

  constructor(parentId: number) {
    this.parentId = parentId;
    this.name = '';
  }
}
