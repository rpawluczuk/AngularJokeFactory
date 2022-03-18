import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from './models/structure';
import {StructureItemDto} from './models/structureItemDto';
import {StructurePresenterDto} from './models/structurePresenterDto';
import {StructureCreatorDto} from './models/structureCreatorDto';
import {StructurePagination} from './structures-list/structure-pagination/structurePagination';

@Injectable({
  providedIn: 'root'
})
export class StructuresService {

  private apiUrl = 'http://localhost:8081/api/structures';

  constructor(private http: HttpClient) {
  }

  getStructurePresenterList(): Observable<StructurePresenterDto[]> {
    return this.http.get<StructurePresenterDto[]>(this.apiUrl);
  }

  getStructurePresenterListByName(searchingPhrase: string) {
    return this.http.get<StructurePresenterDto[]>(`${this.apiUrl}/by-name?name=${searchingPhrase}`);
  }

  getStructureItemList(): Observable<StructureItemDto[]> {
    return this.http.get<StructureItemDto[]>(`${this.apiUrl}/list-items`);
  }

  getStructureCreatorDto(id: number): Observable<StructureCreatorDto> {
    return this.http.get<StructureCreatorDto>(`${this.apiUrl}/${id}`);
  }

  getStructuresByJokeID(jokeId: number): Observable<StructureItemDto[]> {
    return this.http.get<StructureItemDto[]>(`${this.apiUrl}`
      + `/by-joke-id/${jokeId}`);
  }

  getStructurePagination(): Observable<StructurePagination> {
    return this.http.get<StructurePagination>(`${this.apiUrl}/pagination`);
  }

  addStructure(data): Observable<Structure> {
    return this.http.post<Structure>(this.apiUrl, data);
  }

  updateStructure(structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(this.apiUrl, structure);
  }

  updateStructurePagination(structurePagination: StructurePagination): Observable<StructurePagination> {
    return this.http.put<StructurePagination>(`${this.apiUrl}/pagination`, structurePagination);
  }

  removeStructure(id: number): Observable<Structure> {
    return this.http.delete<Structure>(`${this.apiUrl}/${id}`);
  }
}
