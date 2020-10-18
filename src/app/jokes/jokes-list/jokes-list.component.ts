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

  selectedStructuresByDefault = [];
  selectedStructuresByUser: Structure[];
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
    this.selectedStructuresByDefault = [];
    this.selectedStructuresByUser = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  onStructureSelect(item: any) {
    console.log(item.item_id);
    this.selectedStructuresByUser.push(this.allStructures.find(s => s.id === item.item_id));
    console.log(this.selectedStructuresByUser);
  }

  onStructureDeselect(item: any) {
    console.log(item.item_id);
    let deselectedStructure: Structure;
    deselectedStructure = this.allStructures.find(s => s.id === item.item_id);
    console.log(deselectedStructure);
    const index = this.selectedStructuresByUser.indexOf(deselectedStructure);
    console.log(index);
    this.selectedStructuresByUser.splice(index, 1);
    console.log(this.selectedStructuresByUser);
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
    let joke: Joke;
    joke = this.jokeForm.value;
    joke.structures = this.selectedStructuresByUser;
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

  getDropdownList(allStructures: Structure[]): Array<any>{
    const dropdownList = [];
    for (const structure of allStructures){
      dropdownList.push({ item_id: structure.id, item_text: structure.name });
    }
    return dropdownList;
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
