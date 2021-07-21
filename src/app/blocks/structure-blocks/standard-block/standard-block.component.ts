import {Component, Input, OnInit} from '@angular/core';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {StructureBlock} from '../models/structure-block';

@Component({
  selector: 'app-standard-block',
  templateUrl: './standard-block.component.html',
  styleUrls: ['./standard-block.component.css']
})
export class StandardBlockComponent implements OnInit {
  @Input() structureBlock: StructureBlock;
  faLongArrowAltDown = faLongArrowAltDown;

  constructor() {
  }

  ngOnInit(): void {
  }
}
