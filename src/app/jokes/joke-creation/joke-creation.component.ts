import {Component, OnInit, ViewChild} from '@angular/core';
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
import {JokeBlocksService} from '../../blocks/joke-blocks/joke-blocks.service';
import {JokeBlocksWithStructureDto} from '../../blocks/joke-blocks/models/joke-blocks-wtih-structure-dto';
import {StructurePanelComponent} from './structure-panel/structure-panel.component';
import {JokeCreator} from '../models/jokeCreator';
import {OriginItemDto} from '../../origins/models/originItemDto';

@Component({
  selector: 'app-joke-creation',
  templateUrl: './joke-creation.component.html',
  styleUrls: ['./joke-creation.component.css']
})
export class JokeCreationComponent implements OnInit {
  @ViewChild('structurePanelRef')
  structurePanelComponent: StructurePanelComponent;

  jokes: Joke[];
  authors: Author[];
  origins: OriginItemDto[];
  allStructures: Structure[] = [];
  jokeForm: FormGroup;
  jokeBlocksWithStructureDto: JokeBlocksWithStructureDto;
  selectedOriginName: string;

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

  onStructureSelectOrDeselect(selectedField: any) {
    const selectedStructure = this.allStructures.find(s => s.id === selectedField.id);
    this.jokeBlocksService.getJokeBlocksOfTheStructure(selectedStructure.id).subscribe(jokeBlocksWithStructureDto => {
      this.jokeBlocksWithStructureDto = jokeBlocksWithStructureDto;
    });
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
    const jokeBlockWithStructureDtoList = this.structurePanelComponent.getJokeBlocksWithStructureDtoList();
    const joke: JokeCreator = this.jokeForm.value;
    console.log(joke);
    joke.jokeBlocksWithStructureDtoList = jokeBlockWithStructureDtoList;
    this.jokesService.addJoke(joke).subscribe(() => {
        this.router.navigate(['/jokes']);
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
}
