import {Component, OnInit} from '@angular/core';
import {CategorizationItemDto} from '../../categorization/models/CategorizationItemDto';
import {CategorizationService} from '../../categorization/categorization.service';
import {TopicGroupCreatorDto} from '../models/TopicGroupCreatorDto';
import {TopicCreatorChildrenWithParentId} from '../../topics/models/topicCreatorChildrenWithParentId';
import {TopicCreatorChildDto} from '../../topics/models/topicCreatorChildDto';
import {TopicService} from '../../topics/topic.service';
import {TopicItemDto} from '../../topics/models/topicItemDto';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topic-group-creator',
  templateUrl: './topic-group-creator.component.html',
  styleUrls: ['./topic-group-creator.component.css']
})
export class TopicGroupCreatorComponent implements OnInit {

  categorizationItemList: CategorizationItemDto[] = [];
  topicGroupCreatorList: TopicGroupCreatorDto[] = [];
  selectedTopicGroupCreator: TopicGroupCreatorDto;

  topicCreatorRow: TopicCreatorChildrenWithParentId[] = [];

  faLongArrowAltRight = faLongArrowAltRight;
  dropdownSettings = {};

  constructor(private categorizationService: CategorizationService,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.loadCategorizationItemList();
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
    this.topicGroupCreatorList = this.topicGroupCreatorList.filter(tgc => tgc?.categorization?.id !== selectedField.id);
  }


  onTopicGroupClick(topicGroupCreator: TopicGroupCreatorDto) {
    this.selectedTopicGroupCreator = topicGroupCreator;
    const topicCreator = topicGroupCreator?.categorization?.connectingCategory;
    this.topicCreatorRow.push(new TopicCreatorChildrenWithParentId(topicCreator.children, topicCreator.id));
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
    this.selectedTopicGroupCreator.connectingTopic = connectingTopic;
  }

  onSetAsOstensibleTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const ostensibleTopic = new TopicItemDto();
    ostensibleTopic.id = topicCreatorChildDto.id;
    ostensibleTopic.text = topicCreatorChildDto.name;
    this.selectedTopicGroupCreator.ostensibleTopic = ostensibleTopic;
  }

  onSetAsComedyTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const comedyTopic = new TopicItemDto();
    comedyTopic.id = topicCreatorChildDto.id;
    comedyTopic.text = topicCreatorChildDto.name;
    this.selectedTopicGroupCreator.comedyTopic = comedyTopic;
  }

  getTopicGroupList(): TopicGroupCreatorDto[] {
    return this.topicGroupCreatorList;
  }
}
