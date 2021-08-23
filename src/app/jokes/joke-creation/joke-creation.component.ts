import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
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
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {JokeBlockCreatorComponent} from '../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {JokeBlock} from '../../blocks/joke-blocks/models/joke-block';
import {JokeBlocksService} from '../../blocks/joke-blocks/joke-blocks.service';

@Component({
  selector: 'app-joke-creation',
  templateUrl: './joke-creation.component.html',
  styleUrls: ['./joke-creation.component.css']
})
export class JokeCreationComponent implements OnInit {
  @ViewChildren('jokeBlockRef') jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  jokes: Joke[];
  authors: Author[];
  origins: Origin[];
  connectedOrigins: Origin[];
  allStructures: Structure[] = [];
  jokeForm: FormGroup;
  jokeBlocks: JokeBlock[] = [];
  currentStructureIndex = 0;
  currentStructure: Structure;
  selectedOriginName: string;

  selectedStructuresByDefault = [];
  selectedStructuresByUser: Structure[];
  dropdownSettings = {};

  constructor(private jokesService: JokesService,
              private jokeBlocksService: JokeBlocksService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService,
              private blocksService: StructureBlocksService,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {
  }

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

  loadStructures(): void {
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

  onStructureSelect(selectedField: any) {
    const selectedStructure = this.allStructures.find(s => s.id === selectedField.id);
    this.blocksService.getBlocksOfTheStructure(selectedStructure.id).subscribe(structureBlocks => {
      this.selectedStructuresByUser.push(selectedStructure);
      structureBlocks.forEach(structureBlock => this.jokeBlocks.push(new JokeBlock(structureBlock)));
      if (this.selectedStructuresByUser.length === 1){
        this.currentStructure = selectedStructure;
      }
    });
  }

  onStructureDeselect(selectedField: any) {
    this.jokeBlocks = this.jokeBlocks.filter(jokeBlock => jokeBlock.structureBlock.structure.id !== selectedField.id);
    let deselectedStructure: Structure;
    deselectedStructure = this.allStructures.find(s => s.id === selectedField.id);
    const index = this.selectedStructuresByUser.indexOf(deselectedStructure);
    this.selectedStructuresByUser.splice(index, 1);
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structures: [null],
      author: [null],
      origin: [null],
      ostensibleOrigin: [null],
      comedyOrigin: [null]
    });
  }

  addJoke() {
    console.log(this.jokeForm.value);
    const joke: Joke = this.jokeForm.value;
    joke.structures = this.selectedStructuresByUser;
    this.jokesService.addJoke(joke).subscribe(() => {
      if (joke.structures.length > 0) {
        this.addJokeBlocks();
      } else {
        this.router.navigate(['/jokes']);
      }
    });
  }

  addJokeBlocks(){
    this.jokesService.getLastJoke().subscribe(joke => {
      this.jokeBlockComponents.forEach((child) => {
        const jokeBlockFromForm = child.saveJokeBlockValue();
        this.jokeBlocks.forEach((jokeBlock, index) => {
          if (jokeBlock.structureBlock.id === jokeBlockFromForm.structureBlock.id){
            this.jokeBlocks[index] = jokeBlockFromForm;
          }
        });
      });
      this.jokeBlocks.forEach(jokeBlock => jokeBlock.joke = joke);
      this.jokeBlocks.forEach(jokeBlock => {
        this.jokeBlocksService.addJokeBlock(jokeBlock).subscribe(() => {
          this.router.navigate(['/jokes']);
        });
      });
    });
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }

  getDropdownList(allStructures: Structure[]): Array<any> {
    const dropdownList = [];
    for (const structure of allStructures) {
      dropdownList.push({id: structure.id, text: structure.name});
    }
    return dropdownList;
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

  setSelectedOriginName(selectedOriginName: string) {
    console.log(selectedOriginName);
    if (selectedOriginName !== 'null' && selectedOriginName !== 'undefined') {
      this.originService.getConnectedOrigins(selectedOriginName).subscribe(connectedOrigins => {
        console.log(connectedOrigins);
        this.connectedOrigins = connectedOrigins;
      });
    }
  }
}
