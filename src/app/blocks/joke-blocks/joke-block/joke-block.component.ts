import {Component, Input, OnInit} from '@angular/core';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {JokeBlockDto} from '../models/joke-block-dto';

@Component({
  selector: 'app-joke-block',
  templateUrl: './joke-block.component.html',
  styleUrls: ['./joke-block.component.css']
})
export class JokeBlockComponent implements OnInit {
  @Input() jokeBlock: JokeBlockDto;

  faLongArrowAltDown = faLongArrowAltDown;

  constructor() {
  }

  ngOnInit(): void {
  }
}
