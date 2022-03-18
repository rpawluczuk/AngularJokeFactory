import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {QuestionListDto} from '../models/questionListDto';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8081/api/questions';

  constructor(private http: HttpClient) { }

  addQuestion(data): Observable<QuestionListDto> {
    console.log(data);
    return this.http.post<QuestionListDto>(this.apiUrl, data);
  }
}
