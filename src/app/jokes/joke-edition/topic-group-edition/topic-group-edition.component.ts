import {Component, Input, OnInit} from '@angular/core';
import {CategorizationItemDto} from '../../../categorization/models/CategorizationItemDto';
import {TopicGroupCreatorDto} from '../../../topic-group/models/TopicGroupCreatorDto';
import {CategorizationService} from '../../../categorization/categorization.service';
import {JokeCreatorDto} from '../../models/jokeCreatorDto';
import {TopicCreatorChildrenWithParentId} from '../../../topics/models/topicCreatorChildrenWithParentId';
import {TopicCreatorChildDto} from '../../../topics/models/topicCreatorChildDto';
import {TopicService} from '../../../topics/topic.service';
import {TopicItemDto} from '../../../topics/models/topicItemDto';

@Component({
  selector: 'app-topic-group-edition',
  templateUrl: './topic-group-edition.component.html',
  styleUrls: ['./topic-group-edition.component.css']
})
export class TopicGroupEditionComponent implements OnInit {

  @Input()
  jokeCreator: JokeCreatorDto;

  categorizationItemList: CategorizationItemDto[] = [];
  selectedCategorizationItemList: CategorizationItemDto[] = [];
  topicGroupCreatorList: TopicGroupCreatorDto[] = [];
  selectedTopicGroupCreator: TopicGroupCreatorDto = null;
  topicCreatorRow: TopicCreatorChildrenWithParentId[] = [];

  dropdownSettings = {};

  constructor(private categorizationService: CategorizationService,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.loadCategorizationItemList();
    this.loadTopicGroupCreatorList();
    this.loadSelectedCategorizationItemList();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  private loadCategorizationItemList(): void {
    this.categorizationService.getCategorizationItemList().subscribe((categorizationItemList) => {
      this.categorizationItemList = categorizationItemList;
    });
  }

  private loadTopicGroupCreatorList() {
    this.jokeCreator?.topicGroupCreatorList.forEach(topicGroupCreator => {
      this.topicGroupCreatorList.push(topicGroupCreator);
    });
  }

  private loadSelectedCategorizationItemList() {
    this.jokeCreator?.topicGroupCreatorList.forEach(topicGroupCreator => {
      this.categorizationService.getSelectedCategorizationItemList(this.jokeCreator.id).subscribe(selectedCategorizationItemList => {
        this.selectedCategorizationItemList = selectedCategorizationItemList;
      });
    });
  }


  getDropdownList(categorizationItemList: CategorizationItemDto[]): Array<any> {
    const dropdownList = [];
    for (const categorizationItem of categorizationItemList) {
      dropdownList.push({id: categorizationItem.id, text: categorizationItem.text});
    }
    return dropdownList;
  }

  onCategorizationSelect(selectedField: any) {
    this.categorizationService.getCategorizationCreator(selectedField.id).subscribe(categorizationCreator => {
      this.topicGroupCreatorList.push(new TopicGroupCreatorDto(categorizationCreator));
    });
  }

  onCategorizationDeselect(selectedField: any) {
    this.topicGroupCreatorList = this.topicGroupCreatorList.filter(tgc => tgc?.categorizationCreator?.id !== selectedField.id);
  }

  onTopicGroupClick(topicGroupCreator: TopicGroupCreatorDto) {
    this.selectedTopicGroupCreator = topicGroupCreator;
    const topicCreator = topicGroupCreator?.categorizationCreator?.connectingCategory;
    this.topicCreatorRow.push(new TopicCreatorChildrenWithParentId(topicCreator?.children, topicCreator?.id));
    console.log(this.topicCreatorRow);
  }

  onShowChildrenOfChildRequest(topicCreatorChild: TopicCreatorChildDto) {
    this.topicService.getTopicCreatorChildList(topicCreatorChild.id).subscribe(topicCreatorChildren => {
      this.topicCreatorRow.push(new TopicCreatorChildrenWithParentId(topicCreatorChildren, topicCreatorChild.id));
    });
  }

  onRemoveSomeRowsRequest(branchIndex: number) {
    if (branchIndex + 1 < this.topicCreatorRow.length) {
      this.topicCreatorRow.splice(branchIndex + 1);
    }
  }

  onSetAsConnectingTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const connectingTopic = new TopicItemDto();
    connectingTopic.id = topicCreatorChildDto.id;
    connectingTopic.text = topicCreatorChildDto.name;
    this.selectedTopicGroupCreator.connectingTopicItem = connectingTopic;
  }

  onSetAsOstensibleTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const ostensibleTopic = new TopicItemDto();
    ostensibleTopic.id = topicCreatorChildDto.id;
    ostensibleTopic.text = topicCreatorChildDto.name;
    this.selectedTopicGroupCreator.ostensibleTopicItem = ostensibleTopic;
  }

  onSetAsComedyTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const comedyTopic = new TopicItemDto();
    comedyTopic.id = topicCreatorChildDto.id;
    comedyTopic.text = topicCreatorChildDto.name;
    this.selectedTopicGroupCreator.comedyTopicItem = comedyTopic;
  }

  getTopicGroupList(): TopicGroupCreatorDto[] {
    return this.topicGroupCreatorList;
  }
}
