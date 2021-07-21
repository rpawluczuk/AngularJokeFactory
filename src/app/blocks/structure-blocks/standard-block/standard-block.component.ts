import {Component, Input, OnInit} from '@angular/core';
import {StructureStandardBlock} from '../models/structure-standard-block';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-standard-block',
  templateUrl: './standard-block.component.html',
  styleUrls: ['./standard-block.component.css']
})
export class StandardBlockComponent implements OnInit {
  @Input() standardBlock: StructureStandardBlock;
  faLongArrowAltDown = faLongArrowAltDown;

  isFirst: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isFirst = this.standardBlock.position === 0;
  }

}
