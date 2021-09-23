import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from './models/structure';
import {StructureItem} from "./models/StructureItem";

@Injectable({
  providedIn: 'root'
})
export class StructuresService {

  private apiUrl = 'http://localhost:8080/api/structures';

  constructor(private http: HttpClient) {
  }

  getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.apiUrl);
  }

  getStructure(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/${id}`);
  }

  getLastStructure(): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/last`);
  }

  getStructuresByJokeID(jokeId: number): Observable<StructureItem[]> {
    return this.http.get<StructureItem[]>(`${this.apiUrl}`
      + `/by-joke-id/${jokeId}`);
  }

  addStructure(data): Observable<Structure> {
    return this.http.post<Structure>(this.apiUrl, data);
  }

  updateStructure(structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(this.apiUrl, structure);
  }

  removeStructure(id: number): Observable<Structure> {
    return this.http.delete<Structure>(`${this.apiUrl}/${id}`);
  }
}
