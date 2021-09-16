import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {JokeBlocksService} from '../../blocks/joke-blocks/joke-blocks.service';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {JokeBlocksEditionPanelComponent} from './joke-blocks-edition-panel/joke-blocks-edition-panel.component';
import {JokeBlocksWithStructureDto} from '../../blocks/joke-blocks/models/joke-blocks-wtih-structure-dto';
import {JokeCreator} from '../models/jokeCreator';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-edition.component.html',
  styleUrls: ['./joke-edition.component.css']
})
export class JokeEditionComponent implements OnInit, AfterContentInit {
  @ViewChild('jokeBlocksEditionPanelRef')
  jokeBlocksEditionPanelComponent: JokeBlocksEditionPanelComponent;

  joke: Joke;
  jokeForm: FormGroup;
  allStructures: Structure[] = [];
  authors: Author[];
  origins: Origin[];
  connectedOrigins: Origin[];
  jokeBlocksWithStructureDto: JokeBlocksWithStructureDto;

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

  ngAfterContentInit(): void {
    this.selectedStructuresByUser = this.joke.structures;
    this.jokeForm.patchValue({
      structures: this.loadSelectedStructuresByDefault()
    });
  }

  onStructureSelectOrDeselect(selectedField: any) {
    const selectedStructure = this.allStructures.find(s => s.id === selectedField.id);
    this.jokeBlocksService.getJokeBlocksOfTheStructure(selectedStructure.id).subscribe(jokeBlocksWithStructureDto => {
      this.jokeBlocksWithStructureDto = jokeBlocksWithStructureDto;
    });
  }

  loadJoke() {
    this.joke = this.route.snapshot.data.joke;
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: [this.joke.title, Validators.required],
      content: [this.joke.content, Validators.minLength(3)],
      structures: [],
      author: [this.joke.author],
      origin: [this.joke.origin.name],
      ostensibleOrigin: [this.joke.ostensibleOrigin.name],
      comedyOrigin: [this.joke.comedyOrigin.name],
      dateCreated: [this.joke.dateCreated]
    });
  }

  updateJoke() {
    const jokeBlockWithStructureDtoList = this.jokeBlocksEditionPanelComponent.getJokeBlocksWithStructureDtoList();
    const newJoke: JokeCreator = this.jokeForm.value;
    newJoke.id = this.joke.id;
    newJoke.jokeBlocksWithStructureDtoList = jokeBlockWithStructureDtoList;
    this.jokesService.updateJoke(newJoke).subscribe(() => {
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
    if (this.joke.origin !== null) {
      this.originService.getConnectedOrigins(this.joke.origin.name).subscribe(connectedOrigins => {
        this.connectedOrigins = connectedOrigins;
      });
    } else {
      this.joke.origin = new Origin();
      this.joke.comedyOrigin = new Origin();
      this.joke.ostensibleOrigin = new Origin();
    }
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

  // changeCurrentStructure(SelectedStructureIndex: number) {
  //   this.currentStructureIndex = SelectedStructureIndex;
  //   this.currentStructure = this.selectedStructuresByUser[SelectedStructureIndex - 1];
  //   this.jokeBlockComponents.forEach((child) => {
  //     const jokeBlockFromForm = child.saveJokeBlockValue();
  //     this.jokeBlocks.forEach((jokeBlock, jokeBlockIndex) => {
  //       if (jokeBlock.structureBlock.id === jokeBlockFromForm.structureBlock.id) {
  //         this.jokeBlocks[jokeBlockIndex] = jokeBlockFromForm;
  //       }
  //     });
  //   });
  // }

  setSelectedOriginName(selectedOriginName: string) {
    if (selectedOriginName !== 'null' && selectedOriginName !== 'undefined') {
      this.originService.getConnectedOrigins(selectedOriginName).subscribe(connectedOrigins => {
        this.connectedOrigins = connectedOrigins;
      });
    }
  }
}
