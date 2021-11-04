import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategorizationCreatorDto} from './models/CategorizationCreatorDto';
import {HttpClient} from '@angular/common/http';
import {CategorizationPresenterDto} from './models/CategorizationPresenterDto';
import {CategorizationItemDto} from './models/CategorizationItemDto';
import {TopicPagination} from "../topics/topic-list/topic-pagination/topicPagination";
import {CategorizationPagination} from "./categorization-list/categorization-pagination/categorizationPagination";
import {TopicPresenterDto} from "../topics/models/topicPresenterDto";

@Injectable({
  providedIn: 'root'
})
export class CategorizationService {

  private apiUrl = 'http://localhost:8080/api/categorizations';

  constructor(private  http: HttpClient) { }

  getCategorizationPresenterList(): Observable<CategorizationPresenterDto[]> {
    return this.http.get<CategorizationPresenterDto[]>(`${this.apiUrl}/presenter-list`);
  }

  getCategorizationPresenterListByName(name: string): Observable<CategorizationPresenterDto[]> {
    return this.http.get<CategorizationPresenterDto[]>(`${this.apiUrl}/presenter-list/by-name?name=${name}`);
  }

  getCategorizationItemList() {
    return this.http.get<CategorizationItemDto[]>(`${this.apiUrl}/item-list`);
  }

  getSelectedCategorizationItemList(jokeId: number) {
    return this.http.get<CategorizationItemDto[]>(`${this.apiUrl}/item-list/${jokeId}`);
  }

  getCategorizationCreator(id: number): Observable<CategorizationCreatorDto> {
    return this.http.get<CategorizationCreatorDto>(`${this.apiUrl}/${id}`);
  }

  getCategorizationPagination(): Observable<CategorizationPagination> {
    return this.http.get<CategorizationPagination>(`${this.apiUrl}/pagination`);
  }

  addCategorization(data): Observable<CategorizationCreatorDto>{
    return this.http.post<CategorizationCreatorDto>(this.apiUrl, data);
  }

  editCategorization(data): Observable<CategorizationCreatorDto>{
    return this.http.put<CategorizationCreatorDto>(this.apiUrl, data);
  }

  updateCategorizationPagination(categorizationPagination: CategorizationPagination): Observable<CategorizationPagination> {
    return this.http.put<CategorizationPagination>(`${this.apiUrl}/pagination`, categorizationPagination);
  }

  removeCategorization(id: number): Observable<CategorizationPresenterDto> {
    return this.http.delete<CategorizationPresenterDto>(`${this.apiUrl}/${id}`);
  }
}
