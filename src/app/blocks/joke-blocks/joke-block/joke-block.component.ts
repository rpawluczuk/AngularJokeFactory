import {Component, Input, OnInit} from '@angular/core';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {JokeBlock} from '../models/joke-block';

@Component({
  selector: 'app-joke-block',
  templateUrl: './joke-block.component.html',
  styleUrls: ['./joke-block.component.css']
})
export class JokeBlockComponent implements OnInit {
  @Input() jokeBlock: JokeBlock;

  faLongArrowAltDown = faLongArrowAltDown;

  constructor() {
  }

  ngOnInit(): void {
  }
}
