import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StructuresService} from '../../../structures/structures.service';
import {AuthorsService} from '../../../authors/authors.service';
import {TopicService} from '../../../topics/topic.service';
import {TopicPresenterDto} from '../../../topics/models/topicPresenterDto';
import {StructureItemDto} from '../../../structures/models/structureItemDto';
import {AuthorItemDto} from '../../../authors/models/authorItemDto';

@Component({
  selector: 'app-jokes-filtering',
  templateUrl: './jokes-filtering.component.html',
  styleUrls: ['./jokes-filtering.component.css']
})
export class JokesFilteringComponent implements OnInit {
  @Output() finalQuery: EventEmitter<string> = new EventEmitter<string>();

  authorItemList: AuthorItemDto[];
  topicPresenterList: TopicPresenterDto[];
  structureItemList: StructureItemDto[] = [];

  authorQuery: string;
  structureQuery: string;
  authorFilter;
  structureFilter;

  constructor(private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthors();
    this.loadTopicPresenterList();
    this.authorQuery = '';
    this.structureQuery = '';
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

  loadTopicPresenterList(): void {
    this.topicService.getTopicPresenterList().subscribe((topicPresenterList) => {
      this.topicPresenterList = topicPresenterList;
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
