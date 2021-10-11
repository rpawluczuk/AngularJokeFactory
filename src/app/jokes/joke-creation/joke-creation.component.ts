import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Joke} from '../models/joke';
import {JokesService} from '../jokes.service';
import {StructuresService} from '../../structures/structures.service';
import {AuthorsService} from '../../authors/authors.service';
import {Router} from '@angular/router';
import {OriginService} from '../../origins/origin.service';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {JokeBlocksService} from '../../blocks/joke-blocks/joke-blocks.service';
import {StructurePanelComponent} from './structure-panel/structure-panel.component';
import {JokeCreatorDto} from '../models/jokeCreatorDto';
import {OriginItemDto} from '../../origins/models/originItemDto';
import {StructureItemDto} from '../../structures/models/structureItemDto';
import {AuthorItemDto} from '../../authors/models/authorItemDto';

@Component({
  selector: 'app-joke-creation',
  templateUrl: './joke-creation.component.html',
  styleUrls: ['./joke-creation.component.css']
})
export class JokeCreationComponent implements OnInit {
  @ViewChild('structurePanelRef')
  structurePanelComponent: StructurePanelComponent;

  jokes: Joke[];
  authorItemList: AuthorItemDto[];
  origins: OriginItemDto[];
  allStructureItemList: StructureItemDto[] = [];
  jokeForm: FormGroup;
  structureItemDto: StructureItemDto;

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

  loadStructures(): void {
    this.structuresService.getStructureItemList().subscribe((structures) => {
      this.allStructureItemList = structures;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthorItemList().subscribe((authorItemList) => {
      this.authorItemList = authorItemList;
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe((origins) => {
      this.origins = origins;
    });
  }

  onStructureSelectOrDeselect(selectedField: any) {
    const structureItemDto = this.allStructureItemList.find(s => s.id === selectedField.id);
    this.structureItemDto = new StructureItemDto(structureItemDto.id, structureItemDto.text);
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structureItemList: [null],
      author: [null],
      origin: [null],
      ostensibleOrigin: [null],
      comedyOrigin: [null]
    });
  }

  addJoke() {
    const jokeBlockCreatorList = this.structurePanelComponent.getJokeBlockCreatorList();
    const jokeCreator: JokeCreatorDto = this.jokeForm.value;
    jokeCreator.jokeBlockCreatorDtoList = jokeBlockCreatorList;
    this.jokesService.addJoke(jokeCreator).subscribe(() => {
        this.router.navigate(['/jokes']);
    });
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }

  getDropdownList(allStructures: StructureItemDto[]): Array<any> {
    const dropdownList = [];
    for (const structure of allStructures) {
      dropdownList.push({id: structure.id, text: structure.text});
    }
    return dropdownList;
  }
}
