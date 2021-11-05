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
import {TopicGroupCreationPanelComponent} from './topic-group-creation-panel/topic-group-creation-panel.component';

@Component({
  selector: 'app-creation-by-factory',
  templateUrl: './creation-by-factory.component.html',
  styleUrls: ['./creation-by-factory.component.css']
})
export class CreationByFactoryComponent implements OnInit {

  @ViewChild('structurePanelRef')
  structurePanelComponent: StructurePanelComponent;

  @ViewChild('topicGroupCreatorRef')
  topicGroupCreatorComponent: TopicGroupCreationPanelComponent;

  jokes: Joke[];
  authorItemList: AuthorItemDto[];
  topicItemList: TopicItemDto[];
  structureItemList: StructureItemDto[] = [];
  jokeForm: FormGroup;
  structureItem: StructureItemDto;

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
    this.loadStructureItemList();
    this.loadAuthorItemList();
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

  loadStructureItemList(): void {
    this.structuresService.getStructureItemList().subscribe((structures) => {
      this.structureItemList = structures;
    });
  }

  loadAuthorItemList(): void {
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
    const structureItem = this.structureItemList.find(s => s.id === selectedField.id);
    this.structureItem = new StructureItemDto(structureItem.id, structureItem.text);
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structureItemList: [null],
      author: [null]
    });
  }

  addJoke() {
    const jokeBlockCreatorList = this.structurePanelComponent.getJokeBlockCreatorList();
    const jokeCreator: JokeCreatorDto = this.jokeForm.value;
    jokeCreator.topicGroupCreatorList = this.topicGroupCreatorComponent.getTopicGroupList();
    jokeCreator.jokeBlockCreatorDtoList = jokeBlockCreatorList;
    this.jokesService.addJoke(jokeCreator).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }

  getDropdownList(structureItemList: StructureItemDto[]): Array<any> {
    const dropdownList = [];
    for (const structureItem of structureItemList) {
      dropdownList.push({id: structureItem.id, text: structureItem.text});
    }
    return dropdownList;
  }
}
