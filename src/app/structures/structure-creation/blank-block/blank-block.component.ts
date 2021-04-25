import {Component, Input, OnInit} from '@angular/core';
import {DirectionType} from '../../models/direction-type';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {BlankBlock} from '../../models/blank-block';

@Component({
  selector: 'app-blank-block',
  templateUrl: './blank-block.component.html',
  styleUrls: ['./blank-block.component.css']
})
export class BlankBlockComponent implements OnInit {
  @Input() blankBlock: BlankBlock;
  faArrowUp = faArrowUp;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  directionType = DirectionType;

  constructor() {
  }

  ngOnInit(): void {
  }
}
