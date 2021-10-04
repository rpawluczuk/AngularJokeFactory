import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JokeBlockCreatorDto} from '../models/jokeBlockCreatorDto';

@Component({
  selector: 'app-joke-block-creator',
  templateUrl: './joke-block-creator.component.html',
  styleUrls: ['./joke-block-creator.component.css']
})
export class JokeBlockCreatorComponent implements OnInit {
  @Input()
  jokeBlockCreator: JokeBlockCreatorDto;

  jokeBlockForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.jokeBlockForm = this.buildJokeBlockForm();
  }

  private buildJokeBlockForm() {
    return this.formBuilder.group({
      jokeSnippet: [this.jokeBlockCreator.jokeSnippet, Validators.required],
    });
  }

  saveJokeBlockValue(): JokeBlockCreatorDto {
    this.jokeBlockCreator.jokeSnippet = this.jokeBlockForm.value.jokeSnippet;
    return this.jokeBlockCreator;
  }
}
