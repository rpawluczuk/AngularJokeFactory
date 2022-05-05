import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {QuestionListDto} from '../models/questionListDto';
import {QuestionService} from './question.service';
import {QuestionDto} from '../models/questionDto';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit{

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  questionList: QuestionDto[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private questionService: QuestionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.questionService.getQuestionByCategoryId(this.route.snapshot.params.id).subscribe(questionList => {
      this.questionList = questionList;
    });
  }

}
