import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokeBlockCreatorDto} from './models/jokeBlockCreatorDto';
import {JokeBlockPresenterDto} from './models/jokeBlockPresenterDto';

@Injectable({
  providedIn: 'root'
})
export class JokeBlocksService {

  private apiUrl = 'http://localhost:8080/api/joke-blocks';

  constructor(private http: HttpClient) { }

  getJokeBlockCreatorList(jokeId: number): Observable<JokeBlockCreatorDto[]> {
    return this.http.get<JokeBlockCreatorDto[]>(`${this.apiUrl}`
      + `/creator-list/${jokeId}`);
  }

  getJokeBlockPresenterList(jokeId: number): Observable<JokeBlockPresenterDto[]> {
    return this.http.get<JokeBlockPresenterDto[]>(`${this.apiUrl}`
      + `/presenter-list/${jokeId}`);
  }

  getJokeBlockCreatorListByStructure(structureId: number): Observable<JokeBlockCreatorDto[]> {
    return this.http.get<JokeBlockCreatorDto[]>(`${this.apiUrl}`
      + `?structureId=${structureId}`);
  }
}
