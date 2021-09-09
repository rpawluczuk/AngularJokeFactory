import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokeBlock} from './models/joke-block';
import {JokeBlocksWithStructureDto} from './models/joke-blocks-wtih-structure-dto';

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

  getJokeBlocksOfTheStructure(structureId: number): Observable<JokeBlocksWithStructureDto> {
    return this.http.get<JokeBlocksWithStructureDto>(`${this.apiUrl}`
      + `?structureId=${structureId}`);
  }

  getExisitngJokeBlocksOfTheStructure(jokeId: number): Observable<JokeBlocksWithStructureDto[]> {
    return this.http.get<JokeBlocksWithStructureDto[]>(`${this.apiUrl}`
      + `?jokeId=${jokeId}`);
  }
}
