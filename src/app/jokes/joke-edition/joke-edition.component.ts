import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
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
import {JokeBlock} from '../../blocks/joke-blocks/models/joke-block';
import {JokeBlocksService} from '../../blocks/joke-blocks/joke-blocks.service';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {JokeBlockCreatorComponent} from '../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-edition.component.html',
  styleUrls: ['./joke-edition.component.css']
})
export class JokeEditionComponent implements OnInit, AfterViewInit {
  @ViewChildren('jokeBlockRef') jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  joke: Joke;
  jokeBlocks: JokeBlock[];
  jokeForm: FormGroup;
  allStructures: Structure[] = [];
  authors: Author[];
  origins: Origin[];
  currentStructureIndex = 1;
  currentStructure: Structure;

  selectedStructuresByUser: Structure[] = [];
  dropdownSettings = {};

  constructor(private jokesService: JokesService,
              private jokeBlocksService: JokeBlocksService,
              private formBuilder: FormBuilder,
              private structuresService: StructuresService,
              private structureBlocksService: StructureBlocksService,
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
    if (this.selectedStructuresByUser.length > 0){
      this.currentStructure = this.selectedStructuresByUser[0];
    }
    this.jokeForm.patchValue({
      structures: this.loadSelectedStructuresByDefault()
    });
  }

  onStructureSelect(selectedField: any) {
    const selectedStructure = this.allStructures.find(s => s.id === selectedField.id);
    this.structureBlocksService.getBlocksOfTheStructure(selectedStructure.id).subscribe(structureBlocks => {
      this.selectedStructuresByUser.push(selectedStructure);
      structureBlocks.forEach(structureBlock => this.jokeBlocks.push(new JokeBlock(structureBlock)));
      if (this.selectedStructuresByUser.length === 1){
        this.currentStructure = selectedStructure;
      }
    });
  }

  onStructureDeselect(selectedField: any) {
    this.jokeBlocks = [];
    let deselectedStructure: Structure;
    deselectedStructure = this.allStructures.find(s => s.id === selectedField.id);
    const index = this.selectedStructuresByUser.indexOf(deselectedStructure);
    this.selectedStructuresByUser.splice(index, 1);
  }

  loadJoke() {
    this.joke = this.route.snapshot.data.joke;
    this.loadJokeBlocks();
  }

  loadJokeBlocks() {
    this.jokeBlocksService.getBlocksOfTheJoke(this.joke?.id).subscribe(jokeBlocks => {
      if (jokeBlocks.length === 0 && this.joke.structures.length > 0){
        this.joke.structures.forEach(structure => {
          this.structureBlocksService.getBlocksOfTheStructure(structure.id).subscribe(structureBlocks => {
            structureBlocks.forEach(structureBlock => {
              this.jokeBlocks.push(new JokeBlock(structureBlock));
            });
          });
        });
      }
      this.jokeBlocks = jokeBlocks;
    });
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: [this.joke.title, Validators.required],
      content: [this.joke.content, Validators.minLength(3)],
      structures: [],
      author: [this.joke.author],
      origin: [this.joke.origin],
      dateCreated: [this.joke.dateCreated]
    });
  }

  updateJoke() {
    const newJoke = this.jokeForm.value;
    newJoke.id = this.joke.id;
    this.jokesService.updateJoke(newJoke).subscribe(() => {
      this.updateJokeBlocks();
    });
  }

  updateJokeBlocks(){
    this.jokeBlockComponents.forEach((child) => {
      const jokeBlockFromForm = child.saveJokeBlockValue();
      this.jokeBlocks.forEach((jokeBlock, index) => {
        if (jokeBlock.structureBlock.id === jokeBlockFromForm.structureBlock.id){
          this.jokeBlocks[index] = jokeBlockFromForm;
        }
      });
    });
    this.jokeBlocks.forEach(jokeBlock => {
      this.jokeBlocksService.updateJokeBlock(jokeBlock).subscribe(() => {
        this.router.navigate(['/jokes']);
      });
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

  loadSelectedStructuresByDefault(): Array<any> {
    const selectedStructuresByDefault = [];
    for (const structure of this.joke.structures) {
      selectedStructuresByDefault.push({id: structure.id, text: structure.name});
    }
    return selectedStructuresByDefault;
  }

  getDropdownList(allStructures: Structure[]): Array<any> {
    const dropdownList = [];
    for (const structure of allStructures) {
      dropdownList.push({id: structure.id, text: structure.name});
    }
    return dropdownList;
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }

  changeCurrentStructure(SelectedStructureIndex: number){
    this.currentStructureIndex = SelectedStructureIndex;
    this.currentStructure = this.selectedStructuresByUser[SelectedStructureIndex - 1];
    this.jokeBlockComponents.forEach((child) => {
      const jokeBlockFromForm = child.saveJokeBlockValue();
      this.jokeBlocks.forEach((jokeBlock, jokeBlockIndex) => {
        if (jokeBlock.structureBlock.id === jokeBlockFromForm.structureBlock.id){
          this.jokeBlocks[jokeBlockIndex] = jokeBlockFromForm;
        }
      });
    });
  }
}
