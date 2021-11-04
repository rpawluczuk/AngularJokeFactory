import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categorization-search',
  templateUrl: './categorization-search.component.html',
  styleUrls: ['./categorization-search.component.css']
})
export class CategorizationSearchComponent implements OnInit {

  @Output()
  searchRequest: EventEmitter<string> = new EventEmitter<string>();

  faWindowClose = faWindowClose;
  searchingPhrase: string;

  constructor() { }

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
