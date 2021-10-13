import {Component, OnInit} from '@angular/core';
import {StructuresService} from '../structures.service';
import {StructurePresenterDto} from '../models/structurePresenterDto';

@Component({
  selector: 'app-structures-list',
  templateUrl: './structures-list.component.html',
  styleUrls: ['./structures-list.component.css']
})
export class StructuresListComponent implements OnInit {
  structurePresenterList: StructurePresenterDto[];

  constructor(private structuresService: StructuresService) { }

  ngOnInit(): void {
    this.loadStructurePresenterList();
  }

  loadStructurePresenterList(): void{
    this.structuresService.getStructurePresenterList().subscribe((structurePresenterList) => {
      this.structurePresenterList = structurePresenterList;
    });
  }

  onRemovedStructure(structureId: number) {
    this.structuresService.removeStructure(structureId).subscribe(() => {
      this.loadStructurePresenterList();
    });
  }
}
