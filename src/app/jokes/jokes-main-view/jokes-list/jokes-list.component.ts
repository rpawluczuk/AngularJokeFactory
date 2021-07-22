import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Joke} from '../../models/joke';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
  @Input() jokes: Joke[];
  @Output() removeJokeRequest: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  passRemoveJokeRequest(jokeIDToRemove) {
    this.removeJokeRequest.emit(jokeIDToRemove);
  }
}
