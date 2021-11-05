import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthorPresenterDto} from '../../models/authorPresenterDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-author',
  templateUrl: './single-author.component.html',
  styleUrls: ['./single-author.component.css']
})
export class SingleAuthorComponent implements OnInit {

  @Input()
  authorPresenter: AuthorPresenterDto;

  @Output()
  removedAuthor: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  removeAuthor(authorPresenter: AuthorPresenterDto, event) {
    event.stopPropagation();
    this.removedAuthor.emit(authorPresenter.id);
  }
}
