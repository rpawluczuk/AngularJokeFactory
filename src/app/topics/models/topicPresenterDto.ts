export class TopicPresenterDto {

  id: number;
  name: string;
  children: string[];
  dateCreated: string;

  constructor() {
    this.name = '';
    this.children = [];
  }
}
