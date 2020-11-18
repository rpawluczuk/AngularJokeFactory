import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Joke} from '../models/joke';
import {JokesService} from '../jokes.service';
import {Router} from '@angular/router';
import {StructuresService} from '../../structures/structures.service';
import {Structure} from '../../structures/models/Structure';
import {AuthorsService} from '../../authors/authors.service';
import {Author} from '../../authors/models/author';
import {JokePaginationResponse} from '../models/jokePaginationResponse';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
  totalPages: number;
  totalItems: number;
  currentPage = 0;
  pageSize = 5;
  previousPage: any;
  jokes: Joke[];
  authors: Author[];
  allStructures: Structure[] = [];

  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthores();
    this.loadPaginationResponse(this.currentPage, this.pageSize);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.currentPage;
      this.loadPaginationResponse(page - 1, this.pageSize);
    }
  }

  loadPaginationResponse(currentPage: number, pageSize: number): void {
    this.jokesService.getJokes(currentPage, pageSize)
      .subscribe((jokePaginationResponse) => {
      this.totalPages = jokePaginationResponse.totalPages;
      this.currentPage = jokePaginationResponse.currentPage + 1;
      this.pageSize =  jokePaginationResponse.pageSize;
      this.totalItems =  jokePaginationResponse.totalItems;
      this.jokes = jokePaginationResponse.jokes;
    });
  }

  removeJoke(joke: Joke, event) {
    event.stopPropagation();
    this.jokesService.removeJoke(joke.id).subscribe(() => {
      this.loadPaginationResponse(0, 5);
      this.previousPage = undefined;
    });
  }

  goToJokeDetails(joke: Joke) {
    this.router.navigate(['/jokes', joke.id]);
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

  getAuthorNameAndSurname(joke: Joke): string {
    if (joke.author === undefined || joke.author === null) {
      return 'any author';
    } else {
      return joke.author.name + ' ' + joke.author.surname;
    }
  }

  updatePageSize(pageSize: number) {
    this.loadPaginationResponse(0, pageSize);
  }
}
