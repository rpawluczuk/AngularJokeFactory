import {Component, OnInit} from '@angular/core';
import {Joke} from '../models/joke';
import {JokesService} from '../jokes.service';
import {Pagination} from '../../utils/pagination';
import {PaginationService} from '../../utils/pagination.service';

@Component({
  selector: 'app-jokes-main-view',
  templateUrl: './jokes-main-view.component.html',
  styleUrls: ['./jokes-main-view.component.css']
})
export class JokesMainViewComponent implements OnInit {

  pagination: Pagination = new Pagination();
  query: string;

  jokes: Joke[];

  constructor(private jokesService: JokesService,
              private paginationService: PaginationService) {
  }

  ngOnInit(): void {
    this.query = '';
    this.loadAllJokes();
  }

  loadPagination(): void {
    this.paginationService.getPagination()
      .subscribe(pagination => {
        this.pagination = pagination;
        this.pagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  loadAllJokes(): void {
    this.jokesService.getAllJokes()
      .subscribe(jokes => {
        this.jokes = jokes;
        this.loadPagination();
      });
  }

  loadJokes() {
    if (this.query.length === 0) {
      this.loadAllJokes();
    } else {
      this.jokesService.getFilteredJokes(`${this.query}`)
        .subscribe(jokes => {
          this.jokes = jokes;
          this.loadPagination();
        });
    }
  }

  updatePagination() {
    this.paginationService.updatePagination(this.pagination)
      .subscribe(() => this.loadJokes());
  }

  // Requests from components of children

  onFilteringRequest(query: string) {
    this.query = query;
    this.pagination.currentPage = 0;
    this.updatePagination();
    this.loadJokes();
  }

  onRemovedJokeRequest(jokeId: number) {
    this.jokesService.removeJoke(jokeId).subscribe(() => {
      this.pagination.currentPage = 0;
      this.updatePagination();
      this.loadJokes();
    });
  }

  onUpdatePaginationRequest(pagination: Pagination) {
    this.pagination = pagination;
    this.updatePagination();
  }
}
