import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StructuresService} from '../../../structures/structures.service';
import {AuthorsService} from '../../../authors/authors.service';
import {StructureItemDto} from '../../../structures/models/structureItemDto';
import {AuthorItemDto} from '../../../authors/models/authorItemDto';
import {CategorizationService} from '../../../categorization/categorization.service';
import {CategorizationItemDto} from '../../../categorization/models/CategorizationItemDto';

@Component({
  selector: 'app-jokes-filtering',
  templateUrl: './jokes-filtering.component.html',
  styleUrls: ['./jokes-filtering.component.css']
})
export class JokesFilteringComponent implements OnInit {
  @Output() finalQuery: EventEmitter<string> = new EventEmitter<string>();

  authorItemList: AuthorItemDto[];
  structureItemList: StructureItemDto[] = [];
  categorizationItemList: CategorizationItemDto[] = [];

  authorQuery: string;
  structureQuery: string;
  categorizationQuery: string;
  authorFilter;
  structureFilter;
  categorizationFilter;

  constructor(private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private categorizationService: CategorizationService) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthors();
    this.loadCategorizationItemList();
    this.authorQuery = '';
    this.structureQuery = '';
    this.categorizationQuery = '';
  }

  loadStructures(): void {
    this.structuresService.getStructureItemList().subscribe((structures) => {
      this.structureItemList = structures;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthorItemList().subscribe((authorItemList) => {
      this.authorItemList = authorItemList;
    });
  }

  private loadCategorizationItemList() {
    this.categorizationService.getCategorizationItemList().subscribe((categorizationItemList) => {
      this.categorizationItemList = categorizationItemList;
    });
  }

  setAuthorQuery(authorFilter) {
    if (authorFilter === 'All') {
      this.authorQuery = '';
    } else {
      this.authorQuery = `&author=${authorFilter}`;
    }
    this.createQuery();
  }

  setStructureQuery(structureFilter) {
    if (structureFilter === 'All') {
      this.structureQuery = '';
    } else {
      this.structureQuery = `&structures=${structureFilter}`;
    }
    this.createQuery();
  }

  setCategorizationQuery(categorizationFilter) {
    if (categorizationFilter === 'All') {
      this.categorizationQuery = '';
    } else {
      this.categorizationQuery = `&categorization=${categorizationFilter}`;
    }
    this.createQuery();
  }

  createQuery() {
    this.finalQuery.emit(this.authorQuery + this.structureQuery + this.categorizationQuery);
  }
}
