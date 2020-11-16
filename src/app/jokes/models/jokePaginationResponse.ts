import {Joke} from './joke';

export interface JokePaginationResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  jokes: Joke[];
}
