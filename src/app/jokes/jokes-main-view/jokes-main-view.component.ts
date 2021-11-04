import {Component, OnInit} from '@angular/core';
import {JokesService} from '../jokes.service';
import {JokePagination} from './jokes-pagination/jokePagination';
import {JokePresenterDto} from '../models/jokePresenterDto';

@Component({
  selector: 'app-jokes-main-view',
  templateUrl: './jokes-main-view.component.html',
  styleUrls: ['./jokes-main-view.component.css']
})
export class JokesMainViewComponent implements OnInit {

  pagination: JokePagination = new JokePagination();
  query: string;

  jokePresenterList: JokePresenterDto[];

  constructor(private jokesService: JokesService) {
  }

  ngOnInit(): void {
    this.query = '';
    this.loadAllJokes();
  }

  loadPagination(): void {
    this.jokesService.getPagination()
      .subscribe(pagination => {
        this.pagination = pagination;
        this.pagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  loadAllJokes(): void {
    this.jokesService.getAllJokes().subscribe(jokePresenterList => {
        this.jokePresenterList = jokePresenterList;
        this.loadPagination();
      });
  }

  loadJokes() {
    if (this.query.length === 0) {
      this.loadAllJokes();
    } else {
      console.log(this.query);
      this.jokesService.getFilteredJokes(`${this.query}`)
        .subscribe(jokePresenterList => {
          this.jokePresenterList = jokePresenterList;
          this.loadPagination();
        });
    }
  }

  updatePagination() {
    this.jokesService.updatePagination(this.pagination)
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

  onUpdatePaginationRequest(pagination: JokePagination) {
    this.pagination = pagination;
    this.updatePagination();
  }
}
