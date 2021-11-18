import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Topic} from './models/topic';
import {TopicCreatorDto} from './models/topicCreatorDto';
import {TopicCreatorChildDto} from './models/topicCreatorChildDto';
import {TopicPresenterDto} from './models/topicPresenterDto';
import {TopicItemDto} from './models/topicItemDto';
import {TopicPaginationDto} from './models/topicPaginationDto';
import {TopicCreatorChildRowResponseDto} from './models/topicCreatorChildRowResponseDto';
import {TopicCreatorChildRowRequestDto} from './models/topicCreatorChildRowRequestDto';

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

  getTopicPresenterListByName(name: string): Observable<TopicPresenterDto[]> {
    return this.http.get<TopicPresenterDto[]>(`${this.apiUrl}/by-name?name=${name}`);
  }

  getTopicItemList(): Observable<TopicItemDto[]> {
    return this.http.get<TopicItemDto[]>(`${this.apiUrl}/list-items`);
  }

  getTopicCreatorChildList(id: number): Observable<TopicCreatorChildDto[]> {
    return this.http.get<TopicCreatorChildDto[]>(`${this.apiUrl}/topic-creator-children?parent-id=${id}`);
  }

  getTopicCreatorChildPage(request: TopicCreatorChildRowRequestDto): Observable<TopicCreatorChildRowResponseDto> {
    const params = new HttpParams().set('topicCreatorChildRowRequestDto', JSON.stringify(request));
    console.log(JSON.stringify(request));
    return this.http.get<TopicCreatorChildRowResponseDto>(`${this.apiUrl}/topic-creator-child-row`, {params});
  }

  getTopicCreator(id: number): Observable<TopicCreatorDto> {
    return this.http.get<TopicCreatorDto>(`${this.apiUrl}/${id}`);
  }

  getRandomTopic(parentId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/random?parent-id=${parentId}`);
  }

  getTopicPagination(): Observable<TopicPaginationDto> {
    return this.http.get<TopicPaginationDto>(`${this.apiUrl}/pagination`);
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

  updateTopicPagination(topicPagination: TopicPaginationDto): Observable<TopicPaginationDto> {
    return this.http.put<TopicPaginationDto>(`${this.apiUrl}/pagination`, topicPagination);
  }

  removeTopic(id: number): Observable<Topic> {
    return this.http.delete<Topic>(`${this.apiUrl}/${id}`);
  }

  removeTopicRelation(topicParentId: number, topicChildId: number): Observable<Topic> {
    return this.http.delete<Topic>(`${this.apiUrl}/remove-relation?topic-parent-id=${topicParentId}&topic-child-id=${topicChildId}`);
  }
}
