export class TopicCreatorChildDto {
  id: number;
  name: string;
  parentId: number;

  constructor(parentId: number) {
    this.parentId = parentId;
    this.name = '';
  }
}