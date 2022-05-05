import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {QuestionDto} from '../models/questionDto';
import {QuestionCreatorDto} from '../models/questionCreatorDto';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8081/api/questions';

  constructor(private http: HttpClient) {
  }

  addQuestion(data): Observable<QuestionCreatorDto> {
    console.log(data);
    return this.http.post<QuestionCreatorDto>(this.apiUrl, data);
  }

  getQuestionByCategoryId(categoryId: number): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(`${this.apiUrl}/${categoryId}`);
  }
}
