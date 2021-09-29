import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokeBlock} from './models/joke-block';
import {JokeBlockDto} from './models/joke-block-dto';

@Injectable({
  providedIn: 'root'
})
export class JokeBlocksService {

  private apiUrl = 'http://localhost:8080/api/joke-blocks';

  constructor(private http: HttpClient) { }

  addJokeBlock(data): Observable<JokeBlock>{
    return this.http.post<JokeBlock>(this.apiUrl, data);
  }

  getBlocksOfTheJoke(jokeId: number): Observable<JokeBlockDto[]> {
    return this.http.get<JokeBlockDto[]>(`${this.apiUrl}`
      + `/with-joke/${jokeId}`);
  }

  updateJokeBlock(jokeBlock: JokeBlock): Observable<JokeBlock> {
    return this.http.put<JokeBlock>(this.apiUrl, jokeBlock);
  }

  getJokeBlocksOfTheStructure(structureId: number): Observable<JokeBlockDto[]> {
    return this.http.get<JokeBlockDto[]>(`${this.apiUrl}`
      + `?structureId=${structureId}`);
  }

  getExistingJokeBlocksOfTheJoke(jokeId: number): Observable<JokeBlockDto[]> {
    return this.http.get<JokeBlockDto[]>(`${this.apiUrl}`
      + `?jokeId=${jokeId}`);
  }
}
