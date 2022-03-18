export class TopicPresenterDto {

  id: number;
  name: string;
  children: string[];
  dateCreated: string;
  category: boolean;
  questions: string[];

  constructor() {
    this.name = '';
    this.children = [];
  }
}
