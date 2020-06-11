import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Structure} from './models/Structure';

@Injectable({
  providedIn: 'root'
})
export class StructuresService {

  private apiUrl = 'http://localhost:8080/api/structures';

  constructor(private http: HttpClient) { }

  getStructures(): Observable<Structure[]> {
    return this.http.get<GetResponse>(this.apiUrl).pipe(
      map(response => response._embedded.structures)
    );
  }

  getStructure(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/${id}` );
  }

  addStructure(data): Observable<Structure>{
    return this.http.post<Structure>(this.apiUrl, data);
  }

  updateStructure(id: number, data): Observable<Structure> {
    return this.http.put<Structure>(`${this.apiUrl}/${id}`, data);
  }

  removeStructure(id: number): Observable<Structure> {
    return this.http.delete<Structure>(`${this.apiUrl}/${id}`);
  }
}

interface GetResponse {
  _embedded: {
    structures: Structure[];
  };
}
