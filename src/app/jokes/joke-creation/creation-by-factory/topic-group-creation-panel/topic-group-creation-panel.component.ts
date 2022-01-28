import {Component, OnInit} from '@angular/core';
import {CategorizationItemDto} from '../../../../categorization/models/CategorizationItemDto';
import {TopicGroupCreatorDto} from '../../../../topic-group/models/TopicGroupCreatorDto';
import {TopicItemDto} from '../../../../topics/models/topicItemDto';
import {TopicService} from '../../../../topics/topic.service';
import {TopicCreatorDto} from '../../../../topics/models/topicCreatorDto';

@Component({
  selector: 'app-topic-group-creator',
  templateUrl: './topic-group-creation-panel.component.html',
  styleUrls: ['./topic-group-creation-panel.component.css']
})
export class TopicGroupCreationPanelComponent implements OnInit {

  categorizationItemList: CategorizationItemDto[] = [];
  categoryList: TopicItemDto[] = [];
  topicGroupCreatorList: TopicGroupCreatorDto[] = [];
  selectedCategory: TopicCreatorDto;

  dropdownSettings = {};

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.loadCategoryList();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  loadCategoryList(): void {
    this.topicService.getCategoryList().subscribe((categoryList) => {
      this.categoryList = categoryList;
    });
  }

  onCategorySelect(selectedCategory: number) {
    this.topicService.getTopicCreator(selectedCategory).subscribe(topicCreator => {
      this.selectedCategory = topicCreator;
    });
  }

  onCategorizationDeselect(selectedField: any) {
    this.topicGroupCreatorList = this.topicGroupCreatorList.filter(tgc => tgc?.categorizationCreator?.id !== selectedField.id);
  }

  getTopicGroupList(): TopicGroupCreatorDto[] {
    return this.topicGroupCreatorList;
  }
}
