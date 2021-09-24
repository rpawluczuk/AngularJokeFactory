import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Origin} from './models/origin';
import {OriginCreatorDto} from './models/originCreatorDto';
import {OriginCreatorChildDto} from './models/originCreatorChildDto';
import {OriginPresenterDto} from './models/originPresenterDto';
import {OriginItemDto} from './models/originItemDto';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  private apiUrl = 'http://localhost:8080/api/origins';

  constructor(private http: HttpClient) {
  }

  getOrigins(): Observable<OriginPresenterDto[]> {
    return this.http.get<OriginPresenterDto[]>(this.apiUrl);
  }

  getOriginItemList(): Observable<OriginItemDto[]> {
    return this.http.get<OriginItemDto[]>(`${this.apiUrl}/list-items`);
  }

  getOriginCreatorChildList(id: number): Observable<OriginCreatorChildDto[]> {
    return this.http.get<OriginCreatorChildDto[]>(`${this.apiUrl}/origin-creator-children?parent-id=${id}`);
  }

  getOriginCreator(id: number): Observable<OriginCreatorDto> {
    return this.http.get<OriginCreatorDto>(`${this.apiUrl}/${id}`);
  }

  addOrigin(data): Observable<OriginCreatorDto> {
    return this.http.post<OriginCreatorDto>(this.apiUrl, data);
  }

  addOriginChild(data): Observable<OriginCreatorChildDto> {
    return this.http.post<OriginCreatorChildDto>(`${this.apiUrl}/add-origin-child`, data);
  }

  updateOrigin(originCreatorDto: OriginCreatorDto): Observable<OriginCreatorDto> {
    return this.http.put<OriginCreatorDto>(this.apiUrl, originCreatorDto);
  }

  removeOrigin(id: number): Observable<Origin> {
    return this.http.delete<Origin>(`${this.apiUrl}/${id}`);
  }

  removeOriginRelation(originParentId: number, originChildId: number): Observable<Origin> {
    return this.http.delete<Origin>(`${this.apiUrl}/remove-relation?origin-parent-id=${originParentId}&origin-child-id=${originChildId}`);
  }
}
