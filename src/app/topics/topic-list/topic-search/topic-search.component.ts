import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.css']
})
export class TopicSearchComponent implements OnInit {

  faWindowClose = faWindowClose;

  @Output()
  searchRequest: EventEmitter<string> = new EventEmitter<string>();

  searchingPhrase: string;

  constructor() {
  }

  ngOnInit(): void {
    this.searchingPhrase = '';
  }

  doSearch(searchingPhrase: string) {
    this.searchingPhrase = searchingPhrase;
    this.searchRequest.emit(this.searchingPhrase);
  }

  turnOffSearchRequest() {
    this.searchingPhrase = '';
    this.searchRequest.emit(this.searchingPhrase);
  }
}

