import {Component, OnInit} from '@angular/core';
import {StructuresService} from '../structures.service';
import {StructurePresenterDto} from '../models/structurePresenterDto';
import {StructurePagination} from './structure-pagination/structurePagination';

@Component({
  selector: 'app-structures-list',
  templateUrl: './structures-list.component.html',
  styleUrls: ['./structures-list.component.css']
})
export class StructuresListComponent implements OnInit {

  structurePagination: StructurePagination = new StructurePagination();
  structurePresenterList: StructurePresenterDto[];
  searchingPhrase: string;

  constructor(private structuresService: StructuresService) {
  }

  ngOnInit(): void {
    this.searchingPhrase = '';
    this.loadStructurePresenterList();
  }

  loadStructurePresenterList(): void {
    if (this.searchingPhrase.length === 0) {
      this.structuresService.getStructurePresenterList().subscribe((structurePresenterList) => {
        this.structurePresenterList = structurePresenterList;
        this.loadPagination();
      });
    } else {
      this.structuresService.getStructurePresenterListByName(this.searchingPhrase).subscribe((structurePresenterList) => {
        this.structurePresenterList = structurePresenterList;
        this.loadPagination();
      });
    }
  }

  loadPagination(): void {
    this.structuresService.getStructurePagination()
      .subscribe(pagination => {
        this.structurePagination = pagination;
        this.structurePagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  updatePagination() {
    this.structuresService.updateStructurePagination(this.structurePagination)
      .subscribe(() => this.loadStructurePresenterList());
  }

  onRemovedStructure(structureId: number) {
    this.structuresService.removeStructure(structureId).subscribe(() => {
      this.loadStructurePresenterList();
    });
  }

  onSearchRequest(searchingPhrase: string) {
    this.searchingPhrase = searchingPhrase;
    this.loadStructurePresenterList();
  }

  onUpdatePaginationRequest(structurePagination: StructurePagination) {
    this.structurePagination = structurePagination;
    this.updatePagination();
  }
}
