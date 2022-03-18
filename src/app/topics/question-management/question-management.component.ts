import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {QuestionListDto} from '../models/questionListDto';
import {QuestionService} from './question.service';
import {QuestionDto} from "../models/questionDto";

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit{

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  questionForm: FormGroup;
  questions: FormArray;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private questionService: QuestionService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.data;
    this.questionForm = this.buildQuestionForm();
    console.log(id);
  }

  private buildQuestionForm() {
    return this.formBuilder.group({
      questions: this.formBuilder.array([this.createEmptyQuestion()])
    });
  }

  addQuestion() {
    this.questions = this.questionForm.get('questions') as FormArray;
    this.questions.push(this.createEmptyQuestion());
  }

  createEmptyQuestion(): FormGroup {
    return this.formBuilder.group({
      text: ''
    });
  }

  onCancel() {
    this.router.navigate(['/topics']);
  }

  onSave() {
    const questionListDto = new QuestionListDto();
    questionListDto.categoryId = this.route.snapshot.params.id;
    questionListDto.questions = this.questionForm.value.questions;
    console.log(questionListDto);
    this.questionService.addQuestion(questionListDto).subscribe(() => {
      this.router.navigate(['/topics']);
    });
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }
}
