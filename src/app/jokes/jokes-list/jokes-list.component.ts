import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Joke} from '../models/joke';
import {JokesService} from '../jokes.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../../structures/structures.service';
import {Structure} from '../../structures/models/Structure';
import {AuthorsService} from '../../authors/authors.service';
import {Author} from '../../authors/models/author';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
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
    this.loadJokes();
  }

  loadJokes(): void {
    this.jokesService.getJokes().subscribe((jokes) => {
      this.jokes = jokes;
    });
  }

  removeJoke(joke: Joke, event) {
    event.stopPropagation();
    this.jokesService.removeJoke(joke.id).subscribe(() => {
      this.loadJokes();
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
}
