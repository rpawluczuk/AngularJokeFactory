import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StructuresService} from '../../../structures/structures.service';
import {AuthorsService} from '../../../authors/authors.service';
import {OriginService} from '../../../origins/origin.service';
import {Author} from '../../../authors/models/author';
import {Origin} from '../../../origins/models/origin';
import {Structure} from '../../../structures/models/structure';
import {OriginPresenterDto} from "../../../origins/models/originPresenterDto";
import {StructureItemDto} from "../../../structures/models/structureItemDto";

@Component({
  selector: 'app-jokes-filtering',
  templateUrl: './jokes-filtering.component.html',
  styleUrls: ['./jokes-filtering.component.css']
})
export class JokesFilteringComponent implements OnInit {
  @Output() finalQuery: EventEmitter<string> = new EventEmitter<string>();

  authors: Author[];
  origins: OriginPresenterDto[];
  structureItemList: StructureItemDto[] = [];

  authorQuery: string;
  structureQuery: string;
  authorFilter;
  structureFilter;

  constructor(private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthors();
    this.loadOrigins();
    this.authorQuery = '';
    this.structureQuery = '';
  }

  loadStructures(): void {
    this.structuresService.getStructureItemList().subscribe((structures) => {
      this.structureItemList = structures;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe((origins) => {
      this.origins = origins;
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

  createQuery() {
    this.finalQuery.emit(this.authorQuery + this.structureQuery);
  }
}
