import { Component, OnInit } from '@angular/core';
import {CategorizationService} from '../categorization.service';
import {CategorizationPresenterDto} from '../models/CategorizationPresenterDto';

@Component({
  selector: 'app-categorization-list',
  templateUrl: './categorization-list.component.html',
  styleUrls: ['./categorization-list.component.css']
})
export class CategorizationListComponent implements OnInit {

  categorizationPresenterList: CategorizationPresenterDto[];

  constructor(private categorizationService: CategorizationService) { }

  ngOnInit(): void {
    this.loadCategorizationPresenterList();
  }

  private loadCategorizationPresenterList() {
    this.categorizationService.getCategorizationPresenterList().subscribe(categorizationPresenterList => {
      this.categorizationPresenterList = categorizationPresenterList;
    });
  }

  onRemovedCategorization(categorizationId: number) {
    this.categorizationService.removeCategorization(categorizationId).subscribe(() => {
      this.loadCategorizationPresenterList();
    });
  }
}
