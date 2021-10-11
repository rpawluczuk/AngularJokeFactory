import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  faGrinSquintTears,
  faGrinTears,
  faGrinBeam,
  faSmile,
  faMeh,
  faMehRollingEyes
} from '@fortawesome/free-regular-svg-icons';
import {JokesService} from '../../../../jokes.service';
import {JokeRateDto} from '../../../../models/jokeRateDto';

@Component({
  selector: 'app-single-joke-rate',
  templateUrl: './single-joke-rating-panel.component.html',
  styleUrls: ['./single-joke-rating-panel.component.css']
})
export class SingleJokeRatingPanelComponent implements OnInit {
  @Input() jokeId: number;
  @Output() changeRateButtonStatusRequest: EventEmitter<boolean> = new EventEmitter<boolean>();

  faGrinSquintTears = faGrinSquintTears;
  faGrinTears = faGrinTears;
  faGrinBeam = faGrinBeam;
  faSmile = faSmile;
  faMeh = faMeh;
  faMehRollingEyes = faMehRollingEyes;

  constructor(private jokesService: JokesService) {
  }

  ngOnInit(): void {
  }

  sendRate(rate: number) {
    this.jokesService.rateJoke(new JokeRateDto(this.jokeId, rate)).subscribe(() => {
      this.changeRateButtonStatusRequest.emit(false);
    });
  }

  resetRate() {
    this.jokesService.resetJokeRate(this.jokeId).subscribe(() => {
      this.changeRateButtonStatusRequest.emit(false);
    });
  }
}
