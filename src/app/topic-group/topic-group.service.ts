import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TopicGroupPresenterDto} from './models/TopicGroupPresenterDto';

@Injectable({
  providedIn: 'root'
})
export class TopicGroupService {

  private apiUrl = 'http://localhost:8080/api/topic-group';

  constructor(private http: HttpClient) { }

  getTopicGroupPresenterList(jokeId: number): Observable<TopicGroupPresenterDto[]> {
    return this.http.get<TopicGroupPresenterDto[]>(`${this.apiUrl}`
      + `/presenter-list/${jokeId}`);
  }
}
