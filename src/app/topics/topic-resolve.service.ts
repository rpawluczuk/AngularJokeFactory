import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {TopicService} from './topic.service';
import {TopicCreatorDto} from './models/topicCreatorDto';

@Injectable()
export class TopicResolveService implements Resolve<TopicCreatorDto>{

  constructor(private topicService: TopicService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.topicService.getTopicCreator(route.params.id);
  }
}
