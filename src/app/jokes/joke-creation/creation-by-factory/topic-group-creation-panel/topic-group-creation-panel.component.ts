import {Component, OnInit} from '@angular/core';
import {CategorizationItemDto} from '../../../../categorization/models/CategorizationItemDto';
import {CategorizationService} from '../../../../categorization/categorization.service';
import {TopicGroupCreatorDto} from '../../../../topic-group/models/TopicGroupCreatorDto';

@Component({
  selector: 'app-topic-group-creator',
  templateUrl: './topic-group-creation-panel.component.html',
  styleUrls: ['./topic-group-creation-panel.component.css']
})
export class TopicGroupCreationPanelComponent implements OnInit {

  categorizationItemList: CategorizationItemDto[] = [];
  topicGroupCreatorList: TopicGroupCreatorDto[] = [];
  selectedTopicGroupCreator: TopicGroupCreatorDto;

  dropdownSettings = {};

  constructor(private categorizationService: CategorizationService) {
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
    this.topicGroupCreatorList = this.topicGroupCreatorList.filter(tgc => tgc?.categorizationCreator?.id !== selectedField.id);
  }


  onTopicGroupClick(topicGroupCreator: TopicGroupCreatorDto) {
    if (topicGroupCreator !== this.selectedTopicGroupCreator) {
      this.selectedTopicGroupCreator = topicGroupCreator;
    } else {
      this.selectedTopicGroupCreator = null;
    }
  }

  getTopicGroupList(): TopicGroupCreatorDto[] {
    return this.topicGroupCreatorList;
  }
}
