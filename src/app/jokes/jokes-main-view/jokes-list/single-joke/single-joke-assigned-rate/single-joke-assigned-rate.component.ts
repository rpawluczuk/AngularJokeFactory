import {Component, Input, OnInit} from '@angular/core';
import {
  faGrinSquintTears,
  faGrinTears,
  faGrinBeam,
  faSmile,
  faMeh,
  faMehRollingEyes,
  faTrashAlt
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-single-joke-assaigned-rate',
  templateUrl: './single-joke-assigned-rate.component.html',
  styleUrls: ['./single-joke-assigned-rate.component.css']
})
export class SingleJokeAssignedRateComponent implements OnInit {
  @Input()
  rate: number;

  faGrinSquintTears = faGrinSquintTears;
  faGrinTears = faGrinTears;
  faGrinBeam = faGrinBeam;
  faSmile = faSmile;
  faMeh = faMeh;
  faMehRollingEyes = faMehRollingEyes;
  faTrashAlt = faTrashAlt;

  constructor() {
  }

  ngOnInit(): void {
  }

}
