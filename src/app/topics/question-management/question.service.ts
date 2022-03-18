import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {QuestionListDto} from '../models/questionListDto';
import {QuestionDto} from '../models/questionDto';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8081/api/questions';

  constructor(private http: HttpClient) {
  }

  addQuestion(data): Observable<QuestionListDto> {
    return this.http.post<QuestionListDto>(this.apiUrl, data);
  }

  getQuestionByCategoryId(categoryId: number): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(`${this.apiUrl}/${categoryId}`);
  }
}
