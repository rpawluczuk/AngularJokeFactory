import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Joke} from '../models/joke';
import {Author} from '../../authors/models/author';
import {Structure} from '../../structures/models/structure';
import {JokesService} from '../jokes.service';
import {StructuresService} from '../../structures/structures.service';
import {AuthorsService} from '../../authors/authors.service';
import {Router} from '@angular/router';
import {Origin} from '../../origins/models/origin';
import {OriginService} from '../../origins/origin.service';

@Component({
  selector: 'app-joke-creation',
  templateUrl: './joke-creation.component.html',
  styleUrls: ['./joke-creation.component.css']
})
export class JokeCreationComponent implements OnInit {
  jokes: Joke[];
  authors: Author[];
  origins: Origin[];
  allStructures: Structure[] = [];
  jokeForm: FormGroup;

  selectedStructuresByDefault = [];
  selectedStructuresByUser: Structure[];
  dropdownSettings = {};

  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthores();
    this.loadOrigins();
    this.jokeForm = this.buildJokeForm();
    this.selectedStructuresByDefault = [];
    this.selectedStructuresByUser = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
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

  onStructureSelect(item: any) {
    console.log(item.id);
    this.selectedStructuresByUser.push(this.allStructures.find(s => s.id === item.id));
    console.log(this.selectedStructuresByUser);
  }

  onStructureDeselect(item: any) {
    console.log(item.id);
    let deselectedStructure: Structure;
    deselectedStructure = this.allStructures.find(s => s.id === item.id);
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
      author: [null],
      origin: [null]
    });
  }

  addJoke() {
    let joke: Joke;
    joke = this.jokeForm.value;
    joke.structures = this.selectedStructuresByUser;
    console.log(joke);
    this.jokesService.addJoke(this.jokeForm.value).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }

  getDropdownList(allStructures: Structure[]): Array<any>{
    const dropdownList = [];
    for (const structure of allStructures){
      dropdownList.push({ id: structure.id, text: structure.name });
    }
    return dropdownList;
  }
}
