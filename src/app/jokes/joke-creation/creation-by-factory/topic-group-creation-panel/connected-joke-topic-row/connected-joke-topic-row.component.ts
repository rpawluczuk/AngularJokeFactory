import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicCreatorChildDto} from '../../../../../topics/models/topicCreatorChildDto';
import {faPlus, faRandom} from '@fortawesome/free-solid-svg-icons';
import {TopicService} from '../../../../../topics/topic.service';
import {TopicPaginationDto} from '../../../../../topics/models/topicPaginationDto';
import {TopicCreatorChildRowResponseDto} from '../../../../../topics/models/topicCreatorChildRowResponseDto';
import {TopicCreatorChildRowRequestDto} from '../../../../../topics/models/topicCreatorChildRowRequestDto';
import {RandomTopicIdRequestDto} from '../../../../../topics/models/randomTopicIdRequestDto';

@Component({
  selector: 'app-connected-joke-topic-row',
  templateUrl: './connected-joke-topic-row.component.html',
  styleUrls: ['./connected-joke-topic-row.component.css']
})
export class ConnectedJokeTopicRowComponent implements OnInit {

  @Input()
  topicCreatorChildRowAndPage: TopicCreatorChildRowResponseDto;

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
  faRandom = faRandom;
  topicPagination: TopicPaginationDto;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.topicPagination = new TopicPaginationDto();
    this.topicPagination = this.topicCreatorChildRowAndPage.topicPagination;
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
    this.loadTopicCreatorChildRowAndPage();
  }

  reloadChildrenOfTopicCreator() {
    this.topicService.getTopicCreatorChildList(this.topicCreatorChildRowAndPage.parentId).subscribe(topicCreatorChildren => {
      this.topicCreatorChildRowAndPage.topicCreatorChildList = topicCreatorChildren;
    });
  }

  loadTopicCreatorChildRowAndPage(): void {
    if (this.topicCreatorChildRowAndPage?.parentId !== null) {
      const topicCreatorChildRowRequest = new TopicCreatorChildRowRequestDto(this.topicCreatorChildRowAndPage.parentId,
        this.topicPagination);
      this.topicService.getTopicCreatorChildPage(topicCreatorChildRowRequest)
        .subscribe(topicCreatorChildRowAndPage => {
          this.topicCreatorChildRowAndPage = topicCreatorChildRowAndPage;
          this.topicPagination = topicCreatorChildRowAndPage.topicPagination;
        });
    } else {
      const topicCreatorChildRowRequest = new TopicCreatorChildRowRequestDto(null, this.topicPagination);
      this.topicService.getTopicCreatorChildPage(topicCreatorChildRowRequest)
        .subscribe(topicCreatorChildRowAndPage => {
          this.topicCreatorChildRowAndPage = topicCreatorChildRowAndPage;
          this.topicPagination = topicCreatorChildRowAndPage.topicPagination;
          this.topicPagination.currentPage += 1;   // difference between backend and fronted
        });
    }
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

  onRandomRequest() {
    const randomTopicIdRequest = new RandomTopicIdRequestDto(this.topicCreatorChildRowAndPage?.parentId,
      this.topicPagination.pageSize, this.topicPagination.totalPages);
    this.topicService.getRandomTopic(randomTopicIdRequest).subscribe(randomTopicIdResponse => {
      this.topicPagination.currentPage = randomTopicIdResponse.randomPage;
      this.chosenTopicCreatorChildId = randomTopicIdResponse.randomTopicId;
      this.topicCreatorChildRowAndPage.topicCreatorChildList = randomTopicIdResponse.topicCreatorChildList;
    });
  }
}
