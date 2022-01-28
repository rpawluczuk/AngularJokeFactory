export class TopicPresenterDto {

  id: number;
  name: string;
  children: string[];
  dateCreated: string;
  category: boolean;

  constructor() {
    this.name = '';
    this.children = [];
  }
}
