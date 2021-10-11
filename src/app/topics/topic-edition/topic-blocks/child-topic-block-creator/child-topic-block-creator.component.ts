import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Topic} from '../../../models/topic';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TopicService} from '../../../topic.service';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {TopicCreatorChildDto} from '../../../models/topicCreatorChildDto';
import {TopicItemDto} from '../../../models/topicItemDto';

@Component({
  selector: 'app-child-topic-block-creator',
  templateUrl: './child-topic-block-creator.component.html',
  styleUrls: ['./child-topic-block-creator.component.css']
})
export class ChildTopicBlockCreatorComponent implements OnInit {
  @Output() isChildTopicCreationDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() parentId: number;

  topicCreatorChild: TopicCreatorChildDto;
  topicItemList: TopicItemDto[] = [];
  topicChildForm: FormGroup;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private topicService: TopicService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.topicCreatorChild = new TopicCreatorChildDto(this.parentId);
    this.loadTopics();
    this.topicChildForm = this.buildTopicForm();
  }

  buildTopicForm(){
    return this.formBuilder.group({
      name: [this.topicCreatorChild.name, Validators.required]
    });
  }

  loadTopics(): void {
    this.topicService.getTopicItemList().subscribe(topicItem => this.topicItemList = topicItem);
  }

  onSave() {
    this.topicCreatorChild.name = this.topicChildForm.controls.name.value;
    this.topicService.addTopicChild(this.topicCreatorChild).subscribe(() => {
      this.isChildTopicCreationDemanded.emit(false);
    });
  }

  onCancel() {
    this.isChildTopicCreationDemanded.emit(false);
  }
}
