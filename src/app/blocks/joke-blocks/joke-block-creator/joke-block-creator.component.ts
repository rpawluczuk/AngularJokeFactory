import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {JokeBlockDto} from '../models/joke-block-dto';

@Component({
  selector: 'app-joke-block-creator',
  templateUrl: './joke-block-creator.component.html',
  styleUrls: ['./joke-block-creator.component.css']
})
export class JokeBlockCreatorComponent implements OnInit {
  @Input()
  jokeBlockDto: JokeBlockDto;

  faLongArrowAltDown = faLongArrowAltDown;
  jokeBlockForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.jokeBlockForm = this.buildJokeBlockForm();
  }

  private buildJokeBlockForm() {
    return this.formBuilder.group({
      jokeSnippet: [this.jokeBlockDto.jokeSnippet, Validators.required],
    });
  }

  showme(): void {
    console.log('hej');
  }

  saveJokeBlockValue(): JokeBlockDto {
    console.log('ohh yeah');
    this.jokeBlockDto.jokeSnippet = this.jokeBlockForm.value.jokeSnippet;
    return this.jokeBlockDto;
  }
}
