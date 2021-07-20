import {Component, Input, OnInit} from '@angular/core';
import {JokeBlock} from '../models/joke-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-joke-block-creator',
  templateUrl: './joke-block-creator.component.html',
  styleUrls: ['./joke-block-creator.component.css']
})
export class JokeBlockCreatorComponent implements OnInit {
  @Input() jokeBlock: JokeBlock;

  jokeBlockForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.jokeBlockForm = this.buildJokeBlockForm();
  }

  private buildJokeBlockForm() {
    return this.formBuilder.group({
      jokeSnippet: [this.jokeBlock.jokeSnippet, Validators.required],
    });
  }

  saveJokeBlockValue(): JokeBlock {
    this.jokeBlock.jokeSnippet = this.jokeBlockForm.value.jokeSnippet;
    return this.jokeBlock;
  }
}
