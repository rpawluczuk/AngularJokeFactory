import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Topic} from './models/topic';
import {TopicCreatorDto} from './models/topicCreatorDto';
import {TopicCreatorChildDto} from './models/topicCreatorChildDto';
import {TopicPresenterDto} from './models/topicPresenterDto';
import {TopicItemDto} from './models/topicItemDto';
import {TopicPaginationDto} from './models/topicPaginationDto';
import {TopicCreatorChildRowAndPageDto} from './models/topicCreatorChildRowAndPageDto';

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

  getTopicCreatorChildRowAndPage(parentId: number, currentPage: number, pageSize: number): Observable<TopicCreatorChildRowAndPageDto> {
    return this.http.get<TopicCreatorChildRowAndPageDto>(`${this.apiUrl}/topic-creator-child-row?parent-id=${parentId}&current-page=${currentPage}&page-size=${pageSize}`);
  }

  getTopicCreatorChildRowAndPageWithoutParent(currentPage: number, pageSize: number): Observable<TopicCreatorChildRowAndPageDto> {
    return this.http.get<TopicCreatorChildRowAndPageDto>(`${this.apiUrl}/topic-creator-child-row-without-parent?current-page=${currentPage}&page-size=${pageSize}`);
  }

  getTopicCreator(id: number): Observable<TopicCreatorDto> {
    return this.http.get<TopicCreatorDto>(`${this.apiUrl}/${id}`);
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
