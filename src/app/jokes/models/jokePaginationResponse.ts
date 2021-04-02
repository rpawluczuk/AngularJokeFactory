import {Joke} from './joke';
import {Pagination} from '../../utils/pagination';

export interface JokePaginationResponse {
  jokes: Joke[];
  pagination: Pagination;
}
