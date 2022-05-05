import {Component, Input, OnInit} from '@angular/core';
import {QuestionDto} from '../../models/questionDto';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  @Input()
  question: QuestionDto;

  constructor() { }

  ngOnInit(): void {
  }
}
