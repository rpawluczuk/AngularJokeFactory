import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TopicService} from '../../../topic.service';
import {TopicCreatorDto} from '../../../models/topicCreatorDto';

@Component({
  selector: 'app-topic-block-creator',
  templateUrl: './topic-block-creator.component.html',
  styleUrls: ['./topic-block-creator.component.css']
})
export class TopicBlockCreatorComponent implements OnInit {
  @Input() topicCreator: TopicCreatorDto;
  @Output() isTopicEditionDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  topicForm: FormGroup;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private topicService: TopicService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.topicForm = this.buildTopicForm();
  }

  buildTopicForm(){
    return this.formBuilder.group({
      name: [this.topicCreator.name, Validators.required]
    });
  }

  onSave() {
    this.topicCreator.name = this.topicForm.controls.name.value;
    this.topicService.updateTopic(this.topicCreator).subscribe(() => {
      this.isTopicEditionDemanded.emit(false);
    });
  }

  onCancel() {
    this.isTopicEditionDemanded.emit(false);
  }
}
