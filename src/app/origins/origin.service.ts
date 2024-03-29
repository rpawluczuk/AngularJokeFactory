import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../authors/models/author';
import {Origin} from './models/origin';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  private apiUrl = 'http://localhost:8080/api/origins';

  constructor(private  http: HttpClient) { }

  getOrigins(): Observable<Origin[]> {
    return this.http.get<Origin[]>(this.apiUrl);
  }

  getConnectedOrigins(originName: string): Observable<Origin[]> {
    return this.http.get<Origin[]>(`${this.apiUrl}/get-connected-origins?origin-name=${originName}`);
  }

  getOrigin(id: number): Observable<Origin> {
    return this.http.get<Origin>(`${this.apiUrl}/${id}` );
  }

  addOrigin(data): Observable<Origin>{
    return this.http.post<Origin>(this.apiUrl, data);
  }

  updateOrigin(origin: Origin): Observable<Origin> {
    console.log(origin);
    return this.http.put<Origin>(this.apiUrl, origin);
  }

  removeOrigin(id: number): Observable<Origin> {
    return this.http.delete<Origin>(`${this.apiUrl}/${id}`);
  }

  removeOriginRelation(originParentId: number, originChildId: number): Observable<Origin> {
    return this.http.delete<Origin>(`${this.apiUrl}/remove-relation?origin-parent-id=${originParentId}&origin-child-id=${originChildId}`);
  }
}
