import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from './models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'http://localhost:8080/api/authors';

  constructor(private  http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}` );
  }

  addAuthor(data): Observable<Author>{
    return this.http.post<Author>(this.apiUrl, data);
  }

  updateAuthor(author: Author): Observable<Author> {
    console.log(author);
    return this.http.put<Author>(this.apiUrl, author);
  }

  removeAuthor(id: number): Observable<Author> {
    return this.http.delete<Author>(`${this.apiUrl}/${id}`);
  }
}
