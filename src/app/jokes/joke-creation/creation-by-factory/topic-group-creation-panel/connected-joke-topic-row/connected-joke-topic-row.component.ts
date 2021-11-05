import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicCreatorChildDto} from '../../../../../topics/models/topicCreatorChildDto';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TopicService} from '../../../../../topics/topic.service';
import {TopicPaginationDto} from '../../../../../topics/models/topicPaginationDto';
import {TopicCreatorChildRowAndPageDto} from '../../../../../topics/models/topicCreatorChildRowAndPageDto';

@Component({
  selector: 'app-connected-joke-topic-row',
  templateUrl: './connected-joke-topic-row.component.html',
  styleUrls: ['./connected-joke-topic-row.component.css']
})
export class ConnectedJokeTopicRowComponent implements OnInit {

  @Input()
  topicCreatorChildRowAndPage: TopicCreatorChildRowAndPageDto;

  @Input()
  parentIndex: number;

  @Output()
  showChildrenOfChildRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  setAsConnectingTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  setAsOstensibleTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  setAsComedyTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  removeSomeRowsRequest: EventEmitter<number> = new EventEmitter<number>();

  isChildTopicCreationDemanded = false;
  chosenTopicCreatorChildId: number;
  faPlus = faPlus;
  topicPagination: TopicPaginationDto;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.topicPagination = new TopicPaginationDto();
    this.topicPagination.totalPages = this.topicCreatorChildRowAndPage.totalPages;
    this.topicPagination.totalItems = this.topicCreatorChildRowAndPage.totalItems;
  }

  onShowChildrenOfChildRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.chosenTopicCreatorChildId = topicCreatorChildDto.id;
    this.removeSomeRowsRequest.emit(this.parentIndex);
    this.showChildrenOfChildRequest.emit(topicCreatorChildDto);
  }

  onShowTopicCreationFormRequest() {
    this.isChildTopicCreationDemanded = true;
  }

  onRemoveTopicRelationRequest(topicCreatorChild: TopicCreatorChildDto) {
    this.topicService.removeTopicRelation(topicCreatorChild.parentId, topicCreatorChild?.id).subscribe(() => {
      this.reloadChildrenOfTopicCreator();
    });
  }

  onChildTopicCreationRequest(isChildTopicCreationDemanded: boolean) {
    this.isChildTopicCreationDemanded = isChildTopicCreationDemanded;
    this.reloadChildrenOfTopicCreator();
  }

  reloadChildrenOfTopicCreator() {
    this.topicService.getTopicCreatorChildList(this.topicCreatorChildRowAndPage.parentId).subscribe(topicCreatorChildren => {
      this.topicCreatorChildRowAndPage.topicCreatorChildList = topicCreatorChildren;
    });
  }

  loadTopicCreatorChildRowAndPage(): void {
    this.topicService.getTopicCreatorChildRowAndPage(this.topicCreatorChildRowAndPage.parentId,
      this.topicPagination.currentPage, this.topicPagination.pageSize)
      .subscribe(topicCreatorChildRowAndPage => {
        console.log(this.topicPagination);
        this.topicCreatorChildRowAndPage = topicCreatorChildRowAndPage;
        this.topicPagination.totalPages = topicCreatorChildRowAndPage.totalPages;
        this.topicPagination.totalItems = topicCreatorChildRowAndPage.totalItems;
        this.topicPagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  onSetAsConnectingTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsConnectingTopicRequest.emit(topicCreatorChildDto);
  }

  onSetAsOstensibleTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsOstensibleTopicRequest.emit(topicCreatorChildDto);
  }

  onSetAsComedyTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsComedyTopicRequest.emit(topicCreatorChildDto);
  }

  onUpdatePaginationRequest(topicPagination: TopicPaginationDto) {
    this.topicPagination = topicPagination;
    this.loadTopicCreatorChildRowAndPage();
  }
}
