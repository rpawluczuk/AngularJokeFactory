import {Component, OnInit} from '@angular/core';
import {Joke} from '../models/joke';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';
import {Structure} from '../../structures/models/Structure';
import {JokesService} from '../jokes.service';
import {StructuresService} from '../../structures/structures.service';
import {AuthorsService} from '../../authors/authors.service';
import {OriginService} from '../../origins/origin.service';
import {Pagination} from '../../utils/pagination';

@Component({
  selector: 'app-jokes-main-view',
  templateUrl: './jokes-main-view.component.html',
  styleUrls: ['./jokes-main-view.component.css']
})
export class JokesMainViewComponent implements OnInit {

  pagination: Pagination = new Pagination();
  previousPage: any;

  jokes: Joke[];
  authors: Author[];
  origins: Origin[];
  allStructures: Structure[] = [];

  authorFilter = -1;

  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService
  ) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthores();
    this.loadOrigins();
    this.loadPaginationResponse(this.pagination, this.authorFilter);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.pagination.currentPage;
      this.pagination.currentPage -= 1;   // difference between backend and fronted
      this.loadPaginationResponse(this.pagination, this.authorFilter);
    }
  }

  loadPaginationResponse(pagination: Pagination, authorFilter: number): void {
    console.log('loadPagination');
    console.log(authorFilter);
    this.jokesService.getJokes(pagination.currentPage, pagination.pageSize, authorFilter)
      .subscribe((jokePaginationResponse) => {
        this.pagination = jokePaginationResponse.pagination;
        this.pagination.currentPage += 1;   // difference between backend and fronted
        this.jokes = jokePaginationResponse.jokes;
      });
  }

  loadStructures(): void {
    this.structuresService.getStructures().subscribe((structures) => {
      this.allStructures = structures;
    });
  }

  loadAuthores(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe((origins) => {
      this.origins = origins;
    });
  }

  updatePageSize(pageSize: number) {
    this.pagination.pageSize = pageSize;
    this.pagination.currentPage = 0;
    this.loadPaginationResponse(this.pagination, this.authorFilter);
  }

  filterJokesByAuthor(authorId: number) {
    console.log(authorId);
    this.authorFilter = authorId;
    console.log(this.authorFilter);
    this.pagination.currentPage = 0;
    this.loadPaginationResponse(this.pagination, this.authorFilter);
  }

  onRemovedJoke(jokeId: number) {
    this.jokesService.removeJoke(jokeId).subscribe(() => {
      this.pagination.currentPage = 0;
      this.loadPaginationResponse(this.pagination, this.authorFilter);
      this.previousPage = undefined;
    });
  }
}
