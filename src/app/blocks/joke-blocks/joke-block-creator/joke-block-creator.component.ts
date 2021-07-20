import {Component, Input, OnInit} from '@angular/core';
import {JokeBlock} from '../models/joke-block';

@Component({
  selector: 'app-joke-block-creator',
  templateUrl: './joke-block-creator.component.html',
  styleUrls: ['./joke-block-creator.component.css']
})
export class JokeBlockCreatorComponent implements OnInit {
  @Input() jokeBlock: JokeBlock;

  constructor() {
  }

  ngOnInit(): void {
  }

}
