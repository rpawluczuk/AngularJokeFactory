export class QuestionCreatorDto {

  question: string;
  categoryId: number;

  constructor(question: string, categoryId: number) {
    this.categoryId = categoryId;
    this.question = question;
  }
}
