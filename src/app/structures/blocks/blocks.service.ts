import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Block} from '../models/block';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  private apiUrl = 'http://localhost:8080/api/blocks';

  constructor(private http: HttpClient) {
  }

  addBlock(data): Observable<Block>{
    return this.http.post<Block>(this.apiUrl, data);
  }

  updateBlock(block: Block): Observable<Block> {
    return this.http.put<Block>(this.apiUrl, block);
  }

  removeBlock(id: number): Observable<Block> {
    return this.http.delete<Block>(`${this.apiUrl}/${id}`);
  }
}
