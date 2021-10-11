import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {TopicService} from '../topic.service';
import {Router} from '@angular/router';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {TopicCreatorDto} from '../models/topicCreatorDto';
import {TopicItemDto} from '../models/topicItemDto';

@Component({
  selector: 'app-topic-creation',
  templateUrl: './topic-creation.component.html',
  styleUrls: ['./topic-creation.component.css']
})
export class TopicCreationComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  topicItemList: TopicItemDto[] = [];

  topicForm: FormGroup;
  children: FormArray;

  constructor(private topicService: TopicService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTopics();
    this.topicForm = this.buildTopicForm();
  }

  private buildTopicForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      children: this.formBuilder.array([this.createChild()])
    });
  }

  createChild(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  loadTopics(): void {
    this.topicService.getTopicPresenterList().subscribe(topics => this.topicItemList = topics);
  }

  onCancel() {
    this.router.navigate(['/topics']);
  }

  saveTopic() {
    const topicCreator = new TopicCreatorDto();
    topicCreator.name = this.topicForm.value.name;
    topicCreator.children = this.topicForm.value.children;
    this.topicService.addTopic(topicCreator).subscribe(() => {
      this.router.navigate(['/topics']);
    });
  }

  addChild() {
    this.children = this.topicForm.get('children') as FormArray;
    this.children.push(this.createChild());
  }

  removeChild(index: number) {
    this.children.removeAt(index);
  }
}
