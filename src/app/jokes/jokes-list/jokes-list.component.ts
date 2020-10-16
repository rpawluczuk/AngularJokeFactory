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
  allStructures: Structure[];
  jokeForm: FormGroup;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

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
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structures: [null],
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
    this.structuresService.getStructures().subscribe((allStructures) => {
      this.allStructures = allStructures;
    });
  }

  loadAuthores(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  getStructuresNames(joke: Joke): string {
    if (joke.structures === undefined || joke.structures === null) {
      return 'any structure';
    } else {
      let structuresNames = '';
      joke.structures.forEach(structure => structuresNames += structure.name + ', ');
      return structuresNames;
    }
  }

  getAuthorNameAndSurname(joke: Joke): string {
    if (joke.author === undefined || joke.author === null) {
      return 'any author';
    } else {
      return joke.author.name + ' ' + joke.author.surname;
    }
  }
}
