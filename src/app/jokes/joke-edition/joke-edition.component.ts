import {AfterViewInit, Component, OnInit} from '@angular/core';
import {JokesService} from '../jokes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Joke} from '../models/joke';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Structure} from '../../structures/models/structure';
import {StructuresService} from '../../structures/structures.service';
import {Author} from '../../authors/models/author';
import {AuthorsService} from '../../authors/authors.service';
import {Origin} from '../../origins/models/origin';
import {OriginService} from '../../origins/origin.service';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-edition.component.html',
  styleUrls: ['./joke-edition.component.css']
})
export class JokeEditionComponent implements OnInit, AfterViewInit {
  joke: Joke;
  jokeForm: FormGroup;
  allStructures: Structure[] = [];
  authors: Author[];
  origins: Origin[];

  selectedStructuresByUser: Structure[];
  dropdownSettings = {};

  constructor(private jokesService: JokesService,
              private formBuilder: FormBuilder,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadJoke();
    this.loadStructures();
    this.loadAuthors();
    this.loadOrigins();
    this.jokeForm = this.buildJokeForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  ngAfterViewInit(): void {
    this.selectedStructuresByUser = this.joke.structures;
    this.jokeForm.patchValue({
      structures: this.loadSelectedStructuresByDefault()
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

  loadJoke() {
    this.joke = this.route.snapshot.data.joke;
  }

  buildJokeForm(){
    return this.formBuilder.group({
      title: [this.joke.title, Validators.required],
      content: [this.joke.content, Validators.minLength(3)],
      structures: [],
      author: [this.joke.author],
      origin: [this.joke.origin],
      dateCreated: [this.joke.dateCreated]
    });
  }

  updateJoke(){
    console.log(this.joke.id);
    this.jokesService.updateJoke(this.joke.id, this.jokeForm.value).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
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

  loadSelectedStructuresByDefault(): Array<any>{
    const selectedStructuresByDefault = [];
    for (const structure of this.joke.structures){
      selectedStructuresByDefault.push({ id: structure.id, text: structure.name });
    }
    return selectedStructuresByDefault;
  }

  getDropdownList(allStructures: Structure[]): Array<any>{
    const dropdownList = [];
    for (const structure of allStructures){
      dropdownList.push({ id: structure.id, text: structure.name });
    }
    return dropdownList;
  }
}
