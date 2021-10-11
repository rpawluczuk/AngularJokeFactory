import {Injectable} from '@angular/core';
import 'rxjs';
import {Joke} from './models/joke';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokePresenterDto} from './models/jokePresenterDto';
import {JokeCreatorDto} from './models/jokeCreatorDto';

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

  getJokeCreator(id: number): Observable<JokeCreatorDto> {
    return this.http.get<JokeCreatorDto>(`${this.apiUrl}/creator/${id}` );
  }

  getJokePresenter(id: number): Observable<JokePresenterDto> {
    return this.http.get<JokePresenterDto>(`${this.apiUrl}/presenter/${id}` );
  }

  addJoke(data): Observable<Joke>{
    return this.http.post<Joke>(this.apiUrl, data);
  }

  updateJoke(data: any): Observable<JokeCreatorDto> {
    return this.http.put<JokeCreatorDto>(`${this.apiUrl}`, data);
  }

  removeJoke(id: number): Observable<Joke> {
    return this.http.delete<Joke>(`${this.apiUrl}/${id}`);
  }

  rateJoke(data): Observable<JokePresenterDto> {
    return this.http.patch<JokePresenterDto>(`${this.apiUrl}/rate`, data);
  }

  resetJokeRate(id: number): Observable<JokePresenterDto> {
    return this.http.delete<JokePresenterDto>(`${this.apiUrl}/reset-rate/${id}`);
  }
}

interface GetResponse {
  _embedded: {
    jokes: Joke[];
  };
}
