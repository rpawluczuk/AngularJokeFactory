import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../authors/models/author';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  private apiUrl = 'http://localhost:8080/api/origins';

  constructor(private  http: HttpClient) { }

  getOrigins(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getOrigin(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}` );
  }

  addOrigin(data): Observable<Author>{
    return this.http.post<Author>(this.apiUrl, data);
  }

  updateOrigin(author: Author): Observable<Author> {
    console.log(author);
    return this.http.put<Author>(this.apiUrl, author);
  }

  removeOrigin(id: number): Observable<Author> {
    return this.http.delete<Author>(`${this.apiUrl}/${id}`);
  }
}
