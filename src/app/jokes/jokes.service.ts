import {Injectable} from '@angular/core';
import 'rxjs';
import {Joke} from './models/joke';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private apiUrl = 'http://localhost:8080/api/jokes';

  constructor(private http: HttpClient) {
  }

  getJokes(): Observable<Joke[]> {
    return this.http.get<GetResponse>(this.apiUrl).pipe(
      map(response => response._embedded.jokes)
    );
  }

  getJoke(id: number): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/${id}` );
  }

  addJoke(data): Observable<Joke>{
    return this.http.post<Joke>(this.apiUrl, data);
  }

  updateJoke(id: number, data): Observable<Joke> {
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
