import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OriginCreatorDto} from '../../../models/originCreatorDto';


@Component({
  selector: 'app-origin-block',
  templateUrl: './origin-block.component.html',
  styleUrls: ['./origin-block.component.css']
})
export class OriginBlockComponent implements OnInit {
  @Input() originCreator: OriginCreatorDto;
  @Output() isOriginEditionDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit() {
    this.isOriginEditionDemanded.emit(true);
  }
}
