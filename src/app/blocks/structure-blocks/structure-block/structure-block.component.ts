import {Component, Input, OnInit} from '@angular/core';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {StructureBlock} from '../models/structure-block';

@Component({
  selector: 'app-standard-block',
  templateUrl: './structure-block.component.html',
  styleUrls: ['./structure-block.component.css']
})
export class StructureBlockComponent implements OnInit {
  @Input() structureBlock: StructureBlock;
  faLongArrowAltDown = faLongArrowAltDown;

  constructor() {
  }

  ngOnInit(): void {
  }
}
