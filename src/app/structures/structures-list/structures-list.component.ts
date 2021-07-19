import {Component, OnInit} from '@angular/core';
import {Structure} from '../models/structure';
import {StructuresService} from '../structures.service';

@Component({
  selector: 'app-structures-list',
  templateUrl: './structures-list.component.html',
  styleUrls: ['./structures-list.component.css']
})
export class StructuresListComponent implements OnInit {
  structures: Structure[];

  constructor(private structuresService: StructuresService) { }

  ngOnInit(): void {
    this.loadStructures();
  }

  loadStructures(): void{
    this.structuresService.getStructures().subscribe((structures) => {
      this.structures = structures;
    });
  }

  onRemovedStructure(structureId: number) {
    this.structuresService.removeStructure(structureId).subscribe(() => {
      this.loadStructures();
    });
  }
}
