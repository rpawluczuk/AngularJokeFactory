import {Injectable} from '@angular/core';
import 'rxjs';
import {Joke} from './models/joke';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokePaginationResponse} from './models/jokePaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private apiUrl = 'http://localhost:8080/api/jokes';

  constructor(private http: HttpClient) {
  }

  getJokes(currentPage: number, pageSize: number): Observable<JokePaginationResponse> {
    return this.http.get<JokePaginationResponse>(`${this.apiUrl}`
      + `?page=${currentPage}&size=${pageSize}`);
  }

  getJoke(id: number): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/${id}` );
  }

  addJoke(data): Observable<Joke>{
    return this.http.post<Joke>(this.apiUrl, data);
  }

  updateJoke(id: number, data: any): Observable<Joke> {
    return this.http.put<Joke>(`${this.apiUrl}/${id}`, data);
  }

  removeJoke(id: number): Observable<Joke> {
    return this.http.delete<Joke>(`${this.apiUrl}/${id}`);
  }
}

interface GetResponse {
  _embedded: {
    jokes: Joke[];
  };
}
