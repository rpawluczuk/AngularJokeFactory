import {Component, OnInit} from '@angular/core';
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
  structures: Structure[];
  jokeForm: FormGroup;

  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthores();
    this.loadJokes();
    this.jokeForm = this.buildJokeForm();
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structure: [null],
      author: [null]
    });
  }

  loadJokes(): void {
    this.jokesService.getJokes().subscribe((jokes) => {
      this.jokes = jokes;
    });
  }

  addJoke() {
    let joke = this.jokeForm.value;
    console.log(joke);
    this.jokesService.addJoke(this.jokeForm.value).subscribe(() => {
      this.loadJokes();
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

  loadStructures(): void {
    this.structuresService.getStructures().subscribe((structures) => {
      this.structures = structures;
    });
  }

  loadAuthores(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  getStructureName(joke: Joke): string {
    if (joke.structure === undefined || joke.structure === null) {
      return 'any structure';
    } else {
      return this.structures.find(x => x.id === joke.structure.id).name;
    }
  }

  getAuthorNameAndSurname(joke: Joke): string {
    if (joke.author === undefined || joke.author === null) {
      return 'any author';
    } else {
      let author = this.authors.find(x => x.id === joke.author.id);
      return author.name + ' ' + author.surname;
    }
  }
}
