import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {JokePresenterDto} from '../../../models/jokePresenterDto';

@Component({
  selector: 'app-single-joke',
  templateUrl: './single-joke.component.html',
  styleUrls: ['./single-joke.component.css']
})
export class SingleJokeComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;
  @Output() removeJokeRequest: EventEmitter<number> = new EventEmitter<number>();


  isDetailsButtonClicked: boolean;

  constructor(private router: Router) {
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
    this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
  }
}
