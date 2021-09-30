import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StructureBlock} from './models/structure-block';
import {StructureBlockPresenterDto} from './models/structureBlockPresenterDto';

@Injectable({
  providedIn: 'root'
})
export class StructureBlocksService {

  private apiUrl = 'http://localhost:8080/api/blocks';

  constructor(private http: HttpClient) {
  }

  getBlocksOfTheStructure(structureId: number): Observable<StructureBlock[]> {
    return this.http.get<StructureBlock[]>(`${this.apiUrl}`
      + `/with-structure/${structureId}`);
  }

  getStructureBlockPresenterList(structureId: number): Observable<StructureBlockPresenterDto[]> {
    return this.http.get<StructureBlockPresenterDto[]>(`${this.apiUrl}`
      + `/presenter-list/${structureId}`);
  }

  addBlock(data): Observable<StructureBlock>{
    return this.http.post<StructureBlock>(this.apiUrl, data);
  }

  updateBlock(structureBlockList: StructureBlock[]): Observable<StructureBlock> {
    return this.http.put<StructureBlock>(this.apiUrl, structureBlockList);
  }

  removeBlock(id: number): Observable<StructureBlock> {
    return this.http.delete<StructureBlock>(`${this.apiUrl}/${id}`);
  }
}
