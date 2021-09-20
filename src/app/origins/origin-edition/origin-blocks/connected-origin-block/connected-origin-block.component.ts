import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faWindowClose, faCrosshairs, faAngleDoubleDown, faGripHorizontal} from '@fortawesome/free-solid-svg-icons';
import {OriginCreatorChildDto} from '../../../models/originCreatorChildDto';


@Component({
  selector: 'app-connected-origin-block',
  templateUrl: './connected-origin-block.component.html',
  styleUrls: ['./connected-origin-block.component.css']
})
export class ConnectedOriginBlockComponent implements OnInit {
  @Input() originCreatorChild: OriginCreatorChildDto;
  @Input() chosenOriginCreatorChildId: number;
  @Output() removeOriginRelationRequest: EventEmitter<OriginCreatorChildDto> = new EventEmitter<OriginCreatorChildDto>();
  @Output() setAsMainRequest: EventEmitter<OriginCreatorChildDto> = new EventEmitter<OriginCreatorChildDto>();
  @Output() showChildrenOfChildRequest: EventEmitter<OriginCreatorChildDto> = new EventEmitter<OriginCreatorChildDto>();

  faWindowClose = faWindowClose;
  faCrosshairs = faCrosshairs;
  faGripHorizontal = faGripHorizontal;

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteConnectionRequest() {
    this.removeOriginRelationRequest.emit(this.originCreatorChild);
  }

  onSetAsMainRequest() {
    this.setAsMainRequest.emit(this.originCreatorChild);
  }

  onShowChildrenOfChildRequest() {
    this.showChildrenOfChildRequest.emit(this.originCreatorChild);
  }
}
