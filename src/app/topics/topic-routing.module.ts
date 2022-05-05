import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicEditionComponent} from './topic-edition/topic-edition.component';
import {TopicResolveService} from './topic-resolve.service';
import {QuestionManagementComponent} from './question-management/question-management.component';

const topicRoutes: Routes = [
  {
    path: 'topics/:id',
    component: TopicEditionComponent,
    resolve: { topic: TopicResolveService }
  },
  {
    path: 'topics/:id/questions',
    component: QuestionManagementComponent,
    resolve: { id: TopicResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(topicRoutes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }