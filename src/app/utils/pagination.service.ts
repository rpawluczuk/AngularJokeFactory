import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pagination} from './pagination';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    private apiUrl = 'http://localhost:8080/api/pagination';

    constructor(private http: HttpClient) {
    }

    getPagination(): Observable<Pagination> {
        return this.http.get<Pagination>(`${this.apiUrl}`);
    }

    updatePagination(pagination: Pagination): Observable<Pagination> {
        return this.http.put<Pagination>(`${this.apiUrl}`, pagination);
    }
}
