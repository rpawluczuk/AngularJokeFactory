import {Component, Input, OnInit} from '@angular/core';
import {JokeBlockPresenterDto} from '../models/jokeBlockPresenterDto';

@Component({
  selector: 'app-joke-block',
  templateUrl: './joke-block.component.html',
  styleUrls: ['./joke-block.component.css']
})
export class JokeBlockComponent implements OnInit {
  @Input() jokeBlockPresenter: JokeBlockPresenterDto;

  constructor() {
  }

  ngOnInit(): void {
  }
}
