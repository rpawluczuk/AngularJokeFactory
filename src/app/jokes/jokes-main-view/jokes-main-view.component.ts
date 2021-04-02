import {Component, OnInit} from '@angular/core';
import {Joke} from '../models/joke';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';
import {Structure} from '../../structures/models/Structure';
import {JokesService} from '../jokes.service';
import {StructuresService} from '../../structures/structures.service';
import {AuthorsService} from '../../authors/authors.service';
import {OriginService} from '../../origins/origin.service';

@Component({
  selector: 'app-jokes-main-view',
  templateUrl: './jokes-main-view.component.html',
  styleUrls: ['./jokes-main-view.component.css']
})
export class JokesMainViewComponent implements OnInit {
  totalPages: number;
  totalItems: number;
  currentPage = 0;
  pageSize = 5;
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
  ) {}

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthores();
    this.loadOrigins();
    this.loadPaginationResponse(this.currentPage, this.pageSize, this.authorFilter);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.currentPage;
      this.loadPaginationResponse(page - 1, this.pageSize, this.authorFilter);
    }
  }

  loadPaginationResponse(currentPage: number, pageSize: number, authorFilter: number): void {
    console.log('loadPagination');
    console.log(authorFilter);
    this.jokesService.getJokes(currentPage, pageSize, authorFilter)
      .subscribe((jokePaginationResponse) => {
        this.totalPages = jokePaginationResponse.totalPages;
        this.currentPage = jokePaginationResponse.currentPage + 1;
        this.pageSize =  jokePaginationResponse.pageSize;
        this.totalItems =  jokePaginationResponse.totalItems;
        this.jokes = jokePaginationResponse.jokes;
      });
  }

  loadStructures(): void{
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
    this.pageSize = pageSize;
    this.loadPaginationResponse(0, this.pageSize, this.authorFilter);
  }

  filterJokesByAuthor(authorId: number) {
    console.log(authorId);
    this.authorFilter = authorId;
    console.log(this.authorFilter);
    this.loadPaginationResponse(0, this.pageSize, this.authorFilter);
  }

  onRemovedJoke(jokeId: number) {
    this.jokesService.removeJoke(jokeId).subscribe(() => {
      this.loadPaginationResponse(0, 5, this.authorFilter);
      this.previousPage = undefined;
    });
  }
}
