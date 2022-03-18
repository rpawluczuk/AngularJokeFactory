import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorPresenterDto} from './models/authorPresenterDto';
import {AuthorCreatorDto} from './models/authorCreatorDto';
import {AuthorItemDto} from './models/authorItemDto';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'http://localhost:8081/api/authors';

  constructor(private  http: HttpClient) { }

  getAuthorPresenterList(): Observable<AuthorPresenterDto[]> {
    return this.http.get<AuthorPresenterDto[]>(this.apiUrl);
  }

  getAuthorItemList(): Observable<AuthorItemDto[]> {
    return this.http.get<AuthorItemDto[]>(`${this.apiUrl}/list-items`);
  }

  getAuthorCreator(id: number): Observable<AuthorCreatorDto> {
    return this.http.get<AuthorCreatorDto>(`${this.apiUrl}/${id}` );
  }

  addAuthor(data): Observable<AuthorCreatorDto>{
    return this.http.post<AuthorCreatorDto>(this.apiUrl, data);
  }

  updateAuthor(authorCreator: AuthorCreatorDto): Observable<AuthorCreatorDto> {
    return this.http.put<AuthorCreatorDto>(this.apiUrl, authorCreator);
  }

  removeAuthor(id: number): Observable<AuthorPresenterDto> {
    return this.http.delete<AuthorPresenterDto>(`${this.apiUrl}/${id}`);
  }
}
