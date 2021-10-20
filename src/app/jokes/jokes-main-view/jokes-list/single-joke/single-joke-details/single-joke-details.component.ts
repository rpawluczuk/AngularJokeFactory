import {Component, Input, OnInit} from '@angular/core';
import {StructuresService} from '../../../../../structures/structures.service';
import {JokePresenterDto} from '../../../../models/jokePresenterDto';
import {JokeBlocksService} from '../../../../../blocks/joke-blocks/joke-blocks.service';
import {StructureItemDto} from '../../../../../structures/models/structureItemDto';
import {JokeBlockPresenterDto} from '../../../../../blocks/joke-blocks/models/jokeBlockPresenterDto';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {TopicGroupService} from '../../../../../topic-group/topic-group.service';
import {TopicGroupPresenterDto} from '../../../../../topic-group/models/TopicGroupPresenterDto';

@Component({
  selector: 'app-single-joke-details',
  templateUrl: './single-joke-details.component.html',
  styleUrls: ['./single-joke-details.component.css']
})
export class SingleJokeDetailsComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;

  faLongArrowAltDown = faLongArrowAltDown;

  topicGroupPresenterList: TopicGroupPresenterDto[];

  structureItemList: StructureItemDto[] = [];
  currentStructureItem: StructureItemDto;
  jokeBlockPresenterList: JokeBlockPresenterDto[] = [];
  currentStructureIndex = 1;

  constructor(private structuresService: StructuresService,
              private jokeBlocksService: JokeBlocksService,
              private topicGroupService: TopicGroupService) {
  }

  ngOnInit(): void {
    this.loadTopicGroups();
    this.loadBlocksOfTheJoke();
    this.loadStructuresOfTheJoke();
  }

  loadStructuresOfTheJoke(){
    this.structuresService.getStructuresByJokeID(this.jokePresenter?.id).subscribe((structureItemList) => {
      this.structureItemList = structureItemList;
      if (structureItemList.length > 0){
        this.currentStructureItem = structureItemList[0];
      }
    });
  }

  loadBlocksOfTheJoke(): void {
    this.jokeBlocksService.getJokeBlockPresenterList(this.jokePresenter?.id).subscribe((jokeBlocks) => {
      this.jokeBlockPresenterList = jokeBlocks;
    });
  }

  loadTopicGroups(): void {
    this.topicGroupService.getTopicGroupPresenterList(this.jokePresenter?.id).subscribe(topicGroupPresenterList => {
      this.topicGroupPresenterList = topicGroupPresenterList;
      console.log(this.topicGroupPresenterList);
    });
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.currentStructureIndex = SelectedStructureIndex;
    this.currentStructureItem = this.structureItemList[SelectedStructureIndex - 1];
  }
}
