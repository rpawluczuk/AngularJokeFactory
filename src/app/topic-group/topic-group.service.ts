import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TopicGroupPresenterDto} from './models/TopicGroupPresenterDto';
import {TopicGroupCreatorDto} from './models/TopicGroupCreatorDto';

@Injectable({
  providedIn: 'root'
})
export class TopicGroupService {

  private apiUrl = 'http://localhost:8081/api/topic-group';

  constructor(private http: HttpClient) { }

  getTopicGroupPresenterList(jokeId: number): Observable<TopicGroupPresenterDto[]> {
    return this.http.get<TopicGroupPresenterDto[]>(`${this.apiUrl}`
      + `/presenter-list/${jokeId}`);
  }

  getTopicGroupCreatorList(jokeId: number): Observable<TopicGroupCreatorDto[]> {
    return this.http.get<TopicGroupCreatorDto[]>(`${this.apiUrl}`
      + `/creator-list/${jokeId}`);
  }
}
