import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JokeBlock} from './models/joke-block';

@Injectable({
  providedIn: 'root'
})
export class JokeBlocksService {

  private apiUrl = 'http://localhost:8080/api/joke-blocks';

  constructor(private http: HttpClient) { }

  addJokeBlock(data): Observable<JokeBlock>{
    return this.http.post<JokeBlock>(this.apiUrl, data);
  }
}
