import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StructureBlockPresenterDto} from './models/structureBlockPresenterDto';
import {StructureBlockCreatorDto} from './models/structureBlockCreatorDto';

@Injectable({
  providedIn: 'root'
})
export class StructureBlocksService {

  private apiUrl = 'http://localhost:8080/api/structure-blocks';

  constructor(private http: HttpClient) {
  }

  getBlocksOfTheStructure(structureId: number): Observable<StructureBlockCreatorDto[]> {
    return this.http.get<StructureBlockCreatorDto[]>(`${this.apiUrl}`
      + `/creator-list/${structureId}`);
  }

  getStructureBlockPresenterList(structureId: number): Observable<StructureBlockPresenterDto[]> {
    return this.http.get<StructureBlockPresenterDto[]>(`${this.apiUrl}`
      + `/presenter-list/${structureId}`);
  }
}
