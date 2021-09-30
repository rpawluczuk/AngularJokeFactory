import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from './models/structure';
import {StructureItemDto} from './models/structureItemDto';
import {StructurePresenterDto} from './models/structurePresenterDto';
import {StructureCreatorDto} from "./models/structureCreatorDto";

@Injectable({
  providedIn: 'root'
})
export class StructuresService {

  private apiUrl = 'http://localhost:8080/api/structures';

  constructor(private http: HttpClient) {
  }

  getStructurePresenterList(): Observable<StructurePresenterDto[]> {
    return this.http.get<StructurePresenterDto[]>(this.apiUrl);
  }

  getStructureItemList(): Observable<StructureItemDto[]> {
    return this.http.get<StructureItemDto[]>(`${this.apiUrl}/list-items`);
  }

  getStructureCreatorDto(id: number): Observable<StructureCreatorDto> {
    return this.http.get<StructureCreatorDto>(`${this.apiUrl}/${id}`);
  }

  getLastStructure(): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/last`);
  }

  getStructuresByJokeID(jokeId: number): Observable<StructureItemDto[]> {
    return this.http.get<StructureItemDto[]>(`${this.apiUrl}`
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
