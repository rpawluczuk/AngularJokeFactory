import {Component, OnInit, ViewChild} from '@angular/core';
import {Joke} from '../../models/joke';
import {AuthorItemDto} from '../../../authors/models/authorItemDto';
import {TopicItemDto} from '../../../topics/models/topicItemDto';
import {StructureItemDto} from '../../../structures/models/structureItemDto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructurePanelComponent} from './structure-panel/structure-panel.component';
import {JokesService} from '../../jokes.service';
import {JokeBlocksService} from '../../../blocks/joke-blocks/joke-blocks.service';
import {StructuresService} from '../../../structures/structures.service';
import {AuthorsService} from '../../../authors/authors.service';
import {TopicService} from '../../../topics/topic.service';
import {StructureBlocksService} from '../../../blocks/structure-blocks/structure-blocks.service';
import {Router} from '@angular/router';
import {JokeCreatorDto} from '../../models/jokeCreatorDto';

@Component({
  selector: 'app-creation-by-factory',
  templateUrl: './creation-by-factory.component.html',
  styleUrls: ['./creation-by-factory.component.css']
})
export class CreationByFactoryComponent implements OnInit {

  @ViewChild('structurePanelRef')
  structurePanelComponent: StructurePanelComponent;

  jokes: Joke[];
  authorItemList: AuthorItemDto[];
  topicItemList: TopicItemDto[];
  structureItemList: StructureItemDto[] = [];
  jokeForm: FormGroup;
  structureItemDto: StructureItemDto;

  dropdownSettings = {};

  constructor(private jokesService: JokesService,
              private jokeBlocksService: JokeBlocksService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private topicService: TopicService,
              private blocksService: StructureBlocksService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthors();
    this.loadTopicItemList();
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
      this.structureItemList = structures;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthorItemList().subscribe((authorItemList) => {
      this.authorItemList = authorItemList;
    });
  }

  loadTopicItemList(): void {
    this.topicService.getTopicItemList().subscribe((topicItemList) => {
      this.topicItemList = topicItemList;
    });
  }

  onStructureSelectOrDeselect(selectedField: any) {
    const structureItemDto = this.structureItemList.find(s => s.id === selectedField.id);
    this.structureItemDto = new StructureItemDto(structureItemDto.id, structureItemDto.text);
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structureItemList: [null],
      author: [null],
      connectingTopic: [null],
      ostensibleTopic: [null],
      comedyTopic: [null]
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
