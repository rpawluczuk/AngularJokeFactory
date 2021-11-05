import {Component, OnInit} from '@angular/core';
import {CategorizationService} from '../categorization.service';
import {CategorizationPresenterDto} from '../models/CategorizationPresenterDto';
import {CategorizationPagination} from './categorization-pagination/categorizationPagination';
import {TopicPaginationDto} from "../../topics/models/topicPaginationDto";

@Component({
  selector: 'app-categorization-list',
  templateUrl: './categorization-list.component.html',
  styleUrls: ['./categorization-list.component.css']
})
export class CategorizationListComponent implements OnInit {

  categorizationPagination: CategorizationPagination = new CategorizationPagination();
  categorizationPresenterList: CategorizationPresenterDto[];
  searchingPhrase: string;

  constructor(private categorizationService: CategorizationService) {
  }

  ngOnInit(): void {
    this.searchingPhrase = '';
    this.loadCategorizationPresenterList();
  }

  private loadCategorizationPresenterList() {
    if (this.searchingPhrase.length === 0) {
      this.categorizationService.getCategorizationPresenterList().subscribe(categorizationPresenterList => {
        this.categorizationPresenterList = categorizationPresenterList;
        this.loadPagination();
      });
    } else {
      this.categorizationService.getCategorizationPresenterListByName(this.searchingPhrase).subscribe(categorizationPresenterList => {
        this.categorizationPresenterList = categorizationPresenterList;
        this.loadPagination();
      });
    }
  }

  loadPagination(): void {
    this.categorizationService.getCategorizationPagination()
      .subscribe(pagination => {
        this.categorizationPagination = pagination;
        this.categorizationPagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  updatePagination() {
    this.categorizationService.updateCategorizationPagination(this.categorizationPagination)
      .subscribe(() => this.loadCategorizationPresenterList());
  }

  onRemovedCategorization(categorizationId: number) {
    this.categorizationService.removeCategorization(categorizationId).subscribe(() => {
      this.loadCategorizationPresenterList();
    });
  }

  onSearchRequest(searchingPhrase: string) {
    this.searchingPhrase = searchingPhrase;
    this.loadCategorizationPresenterList();
  }

  onUpdatePaginationRequest(categorizationPagination: CategorizationPagination) {
    this.categorizationPagination = categorizationPagination;
    this.updatePagination();
  }
}
