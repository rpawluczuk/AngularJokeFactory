import {Component, Input, OnInit} from '@angular/core';
import {Origin} from '../../../models/origin';

@Component({
  selector: 'app-origin-block',
  templateUrl: './origin-block.component.html',
  styleUrls: ['./origin-block.component.css']
})
export class OriginBlockComponent implements OnInit {
  @Input() origin: Origin;

  constructor() { }

  ngOnInit(): void {
  }
}
