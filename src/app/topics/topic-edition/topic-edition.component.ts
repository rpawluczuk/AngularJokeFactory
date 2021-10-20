import { Component, OnInit } from '@angular/core';
import {TopicService} from '../topic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicCreatorDto} from '../models/topicCreatorDto';
import {TopicCreatorChildDto} from '../models/topicCreatorChildDto';
import {TopicCreatorChildrenWithParentId} from '../models/topicCreatorChildrenWithParentId';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-edition.component.html',
  styleUrls: ['./topic-edition.component.css']
})
export class TopicEditionComponent implements OnInit {

  topicCreator: TopicCreatorDto;
  topicCreatorRow: TopicCreatorChildrenWithParentId[] = [];
  isTopicEditionDemanded = false;

  constructor(private topicService: TopicService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTopic(this.route.snapshot.data.topic.id);
  }

  loadTopic(topicId: number) {
    this.topicService.getTopicCreator(topicId).subscribe(topicCreator => {
      this.topicCreator = topicCreator;
      this.topicCreatorRow.push(new TopicCreatorChildrenWithParentId(topicCreator.children, topicCreator.id));
    });
  }

  onCancel() {
    this.router.navigate(['/topics']);
  }

  onTopicEditionRequest(isTopicEditionDemanded: boolean) {
    this.isTopicEditionDemanded = isTopicEditionDemanded;
  }

  onSetAsMainRequest(topicCreatorChild: TopicCreatorChildDto) {
    this.topicCreatorRow = [];
    this.loadTopic(topicCreatorChild?.id);
  }

  onshowChildrenOfChildRequest(topicCreatorChild: TopicCreatorChildDto) {
    this.topicService.getTopicCreatorChildList(topicCreatorChild.id).subscribe(topicCreatorChildren => {
      this.topicCreatorRow.push(new TopicCreatorChildrenWithParentId(topicCreatorChildren, topicCreatorChild.id));
    });
  }

  onRemoveSomeRowsRequest(branchIndex: number) {
    if (branchIndex + 1 < this.topicCreatorRow.length) {
      this.topicCreatorRow.splice(branchIndex + 1);
    }
  }
}


