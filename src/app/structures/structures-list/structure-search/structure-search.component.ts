import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-structure-search',
  templateUrl: './structure-search.component.html',
  styleUrls: ['./structure-search.component.css']
})
export class StructureSearchComponent implements OnInit {

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
