import {Component, OnInit} from '@angular/core';
import {Joke} from '../models/joke';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';
import {Structure} from '../../structures/models/structure';
import {JokesService} from '../jokes.service';
import {StructuresService} from '../../structures/structures.service';
import {AuthorsService} from '../../authors/authors.service';
import {OriginService} from '../../origins/origin.service';
import {Pagination} from '../../utils/pagination';
import {PaginationService} from '../../utils/pagination.service';

@Component({
  selector: 'app-jokes-main-view',
  templateUrl: './jokes-main-view.component.html',
  styleUrls: ['./jokes-main-view.component.css']
})
export class JokesMainViewComponent implements OnInit {

  pagination: Pagination = new Pagination();

  jokes: Joke[];
  authors: Author[];
  origins: Origin[];
  allStructures: Structure[] = [];

  authorFilter;

  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService,
              private paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthors();
    this.loadOrigins();
    this.loadJokes();
  }

  loadPagination(): void {
    this.paginationService.getPagination()
      .subscribe(pagination => {
        this.pagination = pagination;
        this.pagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  loadJokes(): void {
    this.jokesService.getAllJokes()
      .subscribe(jokes => {
        this.jokes = jokes;
        this.loadPagination();
      });
  }

  filterJokesByAuthor(authorFilter) {
    this.pagination.currentPage = 0;
    if (authorFilter === 'All') {
      this.loadJokes();
    } else {
      this.jokesService.getFilteredJokes(authorFilter)
        .subscribe(jokes => {
          this.jokes = jokes;
        });
    }
  }

  loadStructures(): void {
    this.structuresService.getStructures().subscribe((structures) => {
      this.allStructures = structures;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe((origins) => {
      this.origins = origins;
    });
  }

  onRemovedJoke(jokeId: number) {
    this.jokesService.removeJoke(jokeId).subscribe(() => {
      this.pagination.currentPage = 0;
      this.loadJokes();
    });
  }

  updatePagination(pagination: Pagination) {
    this.pagination = pagination;
    this.paginationService.updatePagination(this.pagination)
      .subscribe(() => this.loadJokes());
  }
}
