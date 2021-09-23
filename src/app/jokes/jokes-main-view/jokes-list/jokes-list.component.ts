import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {JokePresenterDto} from '../../models/jokePresenterDto';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
  @Input() jokePresenterList: JokePresenterDto[];
  @Output() removeJokeRequest: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  passRemoveJokeRequest(jokeIDToRemove) {
    this.removeJokeRequest.emit(jokeIDToRemove);
  }
}
