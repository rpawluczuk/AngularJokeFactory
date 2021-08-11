import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Origin} from '../../../models/origin';
import {faWindowClose, faCrosshairs} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-connected-origin-block',
  templateUrl: './connected-origin-block.component.html',
  styleUrls: ['./connected-origin-block.component.css']
})
export class ConnectedOriginBlockComponent implements OnInit {
  @Input() connectedOrigin: Origin;
  @Output() removeOriginRelationRequest: EventEmitter<number> = new EventEmitter<number>();

  faWindowClose = faWindowClose;
  faCrosshairs = faCrosshairs;

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteConnectionRequest() {
    this.removeOriginRelationRequest.emit(this.connectedOrigin.id);
  }
}
