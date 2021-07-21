import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokeBlock} from './models/joke-block';
import {StructureBlock} from "../structure-blocks/models/structure-block";

@Injectable({
  providedIn: 'root'
})
export class JokeBlocksService {

  private apiUrl = 'http://localhost:8080/api/joke-blocks';

  constructor(private http: HttpClient) { }

  addJokeBlock(data): Observable<JokeBlock>{
    return this.http.post<JokeBlock>(this.apiUrl, data);
  }

  getBlocksOfTheJoke(jokeId: number): Observable<JokeBlock[]> {
    return this.http.get<JokeBlock[]>(`${this.apiUrl}`
      + `/with-joke/${jokeId}`);
  }

  updateJokeBlock(jokeBlock: JokeBlock): Observable<JokeBlock> {
    return this.http.put<JokeBlock>(this.apiUrl, jokeBlock);
  }
}
