import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Topic} from './models/topic';
import {TopicCreatorDto} from './models/topicCreatorDto';
import {TopicCreatorChildDto} from './models/topicCreatorChildDto';
import {TopicPresenterDto} from './models/topicPresenterDto';
import {TopicItemDto} from './models/topicItemDto';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = 'http://localhost:8080/api/topics';

  constructor(private http: HttpClient) {
  }

  getTopicPresenterList(): Observable<TopicPresenterDto[]> {
    return this.http.get<TopicPresenterDto[]>(this.apiUrl);
  }

  getTopicItemList(): Observable<TopicItemDto[]> {
    return this.http.get<TopicItemDto[]>(`${this.apiUrl}/list-items`);
  }

  getTopicCreatorChildList(id: number): Observable<TopicCreatorChildDto[]> {
    return this.http.get<TopicCreatorChildDto[]>(`${this.apiUrl}/topic-creator-children?parent-id=${id}`);
  }

  getTopicCreator(id: number): Observable<TopicCreatorDto> {
    return this.http.get<TopicCreatorDto>(`${this.apiUrl}/${id}`);
  }

  addTopic(data): Observable<TopicCreatorDto> {
    return this.http.post<TopicCreatorDto>(this.apiUrl, data);
  }

  addTopicChild(data): Observable<TopicCreatorChildDto> {
    return this.http.post<TopicCreatorChildDto>(`${this.apiUrl}/add-topic-child`, data);
  }

  updateTopic(data): Observable<TopicCreatorDto> {
    return this.http.patch<TopicCreatorDto>(this.apiUrl, data);
  }

  removeTopic(id: number): Observable<Topic> {
    return this.http.delete<Topic>(`${this.apiUrl}/${id}`);
  }

  removeTopicRelation(topicParentId: number, topicChildId: number): Observable<Topic> {
    return this.http.delete<Topic>(`${this.apiUrl}/remove-relation?topic-parent-id=${topicParentId}&topic-child-id=${topicChildId}`);
  }
}
