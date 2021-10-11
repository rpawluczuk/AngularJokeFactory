import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {JokePresenterDto} from '../../../models/jokePresenterDto';
import {JokesService} from "../../../jokes.service";

@Component({
  selector: 'app-single-joke',
  templateUrl: './single-joke.component.html',
  styleUrls: ['./single-joke.component.css']
})
export class SingleJokeComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;
  @Output() removeJokeRequest: EventEmitter<number> = new EventEmitter<number>();


  isDetailsButtonClicked: boolean;
  isRateButtonClicked: boolean;

  constructor(private router: Router,
              private jokesService: JokesService) {
  }

  ngOnInit(): void {
    this.isDetailsButtonClicked = false;
  }

  removeJoke(jokePresenter: JokePresenterDto, event) {
    event.stopPropagation();
    this.removeJokeRequest.emit(jokePresenter.id);
  }

  goToJokeEdition() {
    this.router.navigate(['/jokes', this.jokePresenter.id]);
  }

  showJokeDetails() {
    this.isRateButtonClicked = false;
    this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
  }

  showJokeRate() {
    this.isDetailsButtonClicked = false;
    this.isRateButtonClicked = !this.isRateButtonClicked;
  }

  onChangeRateButtonStatusRequest(shouldBeClicked: boolean) {
    this.jokesService.getJokePresenter(this.jokePresenter.id).subscribe(jokePresenter => {
      this.jokePresenter = jokePresenter;
    });
    this.isRateButtonClicked = shouldBeClicked;
  }
}
