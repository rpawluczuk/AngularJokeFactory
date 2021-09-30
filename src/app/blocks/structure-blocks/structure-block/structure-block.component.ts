import {Component, Input, OnInit} from '@angular/core';
import {StructureBlockPresenterDto} from '../models/structureBlockPresenterDto';

@Component({
  selector: 'app-standard-block',
  templateUrl: './structure-block.component.html',
  styleUrls: ['./structure-block.component.css']
})
export class StructureBlockComponent implements OnInit {
  @Input() structureBlock: StructureBlockPresenterDto;

  constructor() {
  }

  ngOnInit(): void {
  }
}
