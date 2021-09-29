import {Component, OnInit, ViewChild} from '@angular/core';
import {JokesService} from '../jokes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../../structures/structures.service';
import {Author} from '../../authors/models/author';
import {AuthorsService} from '../../authors/authors.service';
import {OriginService} from '../../origins/origin.service';
import {JokeBlocksService} from '../../blocks/joke-blocks/joke-blocks.service';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {JokeBlocksEditionPanelComponent} from './joke-blocks-edition-panel/joke-blocks-edition-panel.component';
import {JokeCreator} from '../models/jokeCreator';
import {OriginItemDto} from '../../origins/models/originItemDto';
import {StructureItemDto} from '../../structures/models/StructureItemDto';
import {JokeBlockDto} from '../../blocks/joke-blocks/models/joke-block-dto';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-edition.component.html',
  styleUrls: ['./joke-edition.component.css']
})
export class JokeEditionComponent implements OnInit {
  @ViewChild('jokeBlocksEditionPanelRef')
  jokeBlocksEditionPanelComponent: JokeBlocksEditionPanelComponent;

  jokeCreator: JokeCreator;
  jokeForm: FormGroup;
  allStructureItemList: StructureItemDto[] = [];
  authors: Author[];
  originItemList: OriginItemDto[];
  jokeBlockDtoList: JokeBlockDto[] = [];

  structureItemDto: StructureItemDto;
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
    this.jokeForm = this.buildJokeForm();
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

  onStructureSelectOrDeselect(selectedField: any) {
    const selectedStructureItemDto = this.allStructureItemList.find(s => s.id === selectedField.id);
    this.structureItemDto = new StructureItemDto(selectedStructureItemDto.id, selectedStructureItemDto.text);
  }

  loadJoke() {
    this.jokeCreator = this.route.snapshot.data.joke;
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: [this.jokeCreator?.title, Validators.required],
      content: [this.jokeCreator?.content, Validators.minLength(3)],
      structureItemList: [this.jokeCreator?.structureItemList],
      author: [this.jokeCreator?.author],
      origin: [this.jokeCreator?.origin],
      ostensibleOrigin: [this.jokeCreator?.ostensibleOrigin],
      comedyOrigin: [this.jokeCreator?.comedyOrigin],
      dateCreated: [this.jokeCreator?.dateCreated]
    });
  }

  updateJoke() {
    const jokeBlockDtoList = this.jokeBlocksEditionPanelComponent.getJokeBlockDtoList();
    const newJoke: JokeCreator = this.jokeForm.value;
    newJoke.id = this.jokeCreator.id;
    newJoke.jokeBlockDtoList = jokeBlockDtoList ;
    console.log(newJoke);
    this.jokesService.updateJoke(newJoke).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
  }

  loadStructures(): void {
    this.structuresService.getStructureItemList().subscribe((structureItemList) => {
      this.allStructureItemList = structureItemList;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  loadOrigins(): void {
    this.originService.getOriginItemList().subscribe((originItem) => {
      this.originItemList = originItem;
    });
  }

  getDropdownList(allStructures: StructureItemDto[]): Array<any> {
    const dropdownList = [];
    for (const structure of allStructures) {
      dropdownList.push({id: structure.id, text: structure.text});
    }
    return dropdownList;
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }
}
