import {Injectable} from '@angular/core';
import 'rxjs';
import {Joke} from './models/joke';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokePresenterDto} from './models/jokePresenterDto';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private apiUrl = 'http://localhost:8080/api/jokes';

  constructor(private http: HttpClient) {
  }

  getAllJokes(): Observable<JokePresenterDto[]> {
    return this.http.get<JokePresenterDto[]>(`${this.apiUrl}`);
  }

  getFilteredJokes(filter: string): Observable<JokePresenterDto[]> {
    return this.http.get<JokePresenterDto[]>(`${this.apiUrl}`
        + `?query${filter}`);
  }

  getJoke(id: number): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/${id}` );
  }

  getLastJoke(): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/last` );
  }

  addJoke(data): Observable<Joke>{
    return this.http.post<Joke>(this.apiUrl, data);
  }

  updateJoke(data: any): Observable<Joke> {
    return this.http.put<Joke>(`${this.apiUrl}`, data);
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
