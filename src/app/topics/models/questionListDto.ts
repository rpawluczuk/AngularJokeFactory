import {QuestionDto} from './questionDto';

export class QuestionListDto {

  categoryId: number;
  questions: QuestionDto[] = [];
}
