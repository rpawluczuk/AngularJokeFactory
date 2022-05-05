import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicPresenterDto} from '../../models/topicPresenterDto';
import {Router} from '@angular/router';
import {TopicService} from '../../topic.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../question-management/question.service';
import {QuestionCreatorDto} from '../../models/questionCreatorDto';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.css']
})
export class SingleTopicComponent implements OnInit {

  @Input()
  topicPresenter: TopicPresenterDto;

  @Output()
  loadTopicPresenterList: EventEmitter<boolean> = new EventEmitter<boolean>();

  questionForm: FormGroup;
  isQuestionManagementButtonClicked = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private topicService: TopicService,
              private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionForm = this.buildQuestionForm();
  }

  private buildQuestionForm() {
    return this.formBuilder.group({
      question: ['', Validators.required],
    });
  }

  removeTopic(topicPresenter: TopicPresenterDto, event) {
    event.stopPropagation();
    this.topicService.removeTopic(topicPresenter.id).subscribe(() => {
      this.loadTopicPresenterList.emit(true);
    });
  }

  goToTopicEdition(topicPresenter: TopicPresenterDto) {
    this.router.navigate(['/topics', topicPresenter.id]);
  }

  goToQuestionManagement(topicPresenter: TopicPresenterDto) {
    this.isQuestionManagementButtonClicked = true;
  }

  addQuestion(){
    const questionCreatorDto = new QuestionCreatorDto(this.questionForm.controls.question.value, this.topicPresenter.id);
    this.questionService.addQuestion(questionCreatorDto).subscribe(() => {
      this.questionService.getQuestionByCategoryId(this.topicPresenter.id).subscribe( questionList => {
        this.topicPresenter.questions = questionList.map(questionDto => questionDto.question);
      });
    });
  }

  changeCategoryStatus() {
    this.topicService.changeCategoryStatus(this.topicPresenter.id).subscribe(() => {
      this.topicPresenter.category = !this.topicPresenter.category;
    });
  }
}
