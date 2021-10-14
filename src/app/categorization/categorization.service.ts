import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategorizationCreatorDto} from './models/CategorizationCreatorDto';
import {HttpClient} from '@angular/common/http';
import {CategorizationPresenterDto} from './models/CategorizationPresenterDto';

@Injectable({
  providedIn: 'root'
})
export class CategorizationService {

  private apiUrl = 'http://localhost:8080/api/categorizations';

  constructor(private  http: HttpClient) { }

  getCategorizationPresenterList(): Observable<CategorizationPresenterDto[]> {
    return this.http.get<CategorizationPresenterDto[]>(`${this.apiUrl}/presenter-list`);
  }

  getCategorizationCreator(id: number): Observable<CategorizationCreatorDto> {
    return this.http.get<CategorizationCreatorDto>(`${this.apiUrl}/${id}`);
  }

  addCategorization(data): Observable<CategorizationCreatorDto>{
    return this.http.post<CategorizationCreatorDto>(this.apiUrl, data);
  }

  editCategorization(data): Observable<CategorizationCreatorDto>{
    return this.http.put<CategorizationCreatorDto>(this.apiUrl, data);
  }

  removeCategorization(id: number): Observable<CategorizationPresenterDto> {
    return this.http.delete<CategorizationPresenterDto>(`${this.apiUrl}/${id}`);
  }
}
