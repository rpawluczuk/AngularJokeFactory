import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.css']
})
export class TopicSearchComponent implements OnInit {

  @Output()
  searchRequest: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    this.searchRequest.emit(value);
  }
}

