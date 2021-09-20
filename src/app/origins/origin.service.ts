import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Origin} from './models/origin';
import {OriginCreatorDto} from './models/originCreatorDto';
import {OriginCreatorChildDto} from "./models/originCreatorChildDto";
import {OriginPresenterDto} from "./models/originPresenterDto";
import {OriginItemDto} from "./models/originItemDto";

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

  getConnectedOrigins(originName: string): Observable<Origin[]> {
    return this.http.get<Origin[]>(`${this.apiUrl}/get-connected-origins?origin-name=${originName}`);
  }

  getOriginCreatorChildList(id: number): Observable<OriginCreatorChildDto[]> {
    return this.http.get<OriginCreatorChildDto[]>(`${this.apiUrl}/origin-creator-children?origin-id=${id}`);
  }

  getOrigin(id: number): Observable<Origin> {
    return this.http.get<Origin>(`${this.apiUrl}/${id}`);
  }

  getOriginCreator(originName: string): Observable<OriginCreatorDto> {
    return this.http.get<OriginCreatorDto>(`${this.apiUrl}?originCreatorName=${originName}`);
  }

  addOrigin(data): Observable<OriginCreatorDto> {
    return this.http.post<OriginCreatorDto>(this.apiUrl, data);
  }

  addOriginChild(data): Observable<OriginCreatorChildDto> {
    return this.http.post<OriginCreatorChildDto>(`${this.apiUrl}/add-origin-child`, data);
  }

  updateOrigin(origin: Origin): Observable<Origin> {
    return this.http.put<Origin>(this.apiUrl, origin);
  }

  removeOrigin(id: number): Observable<Origin> {
    return this.http.delete<Origin>(`${this.apiUrl}/${id}`);
  }

  removeOriginRelation(originParentId: number, originChildId: number): Observable<Origin> {
    return this.http.delete<Origin>(`${this.apiUrl}/remove-relation?origin-parent-id=${originParentId}&origin-child-id=${originChildId}`);
  }
}
