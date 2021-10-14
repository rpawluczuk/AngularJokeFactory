import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategorizationPresenterDto} from '../../models/CategorizationPresenterDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-categorization',
  templateUrl: './single-categorization.component.html',
  styleUrls: ['./single-categorization.component.css']
})
export class SingleCategorizationComponent implements OnInit {
  @Input() categorizationPresenter: CategorizationPresenterDto;
  @Output() removedCategorization: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCategorizationEdition() {
    this.router.navigate(['/categorizations', this.categorizationPresenter.id]);
  }

  removeCategorization(categorizationPresenter: CategorizationPresenterDto, event) {
    event.stopPropagation();
    this.removedCategorization.emit(categorizationPresenter.id);
  }
}
