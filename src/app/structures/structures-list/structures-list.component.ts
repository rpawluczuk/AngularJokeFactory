import {Component, OnInit} from '@angular/core';
import {Structure} from '../models/structure';
import {Router} from '@angular/router';
import {StructuresService} from '../structures.service';
import {Block} from '../models/block';

@Component({
  selector: 'app-structures-list',
  templateUrl: './structures-list.component.html',
  styleUrls: ['./structures-list.component.css']
})
export class StructuresListComponent implements OnInit {
  structures: Structure[];

  constructor(private structuresService: StructuresService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadStructures();
  }

  loadStructures(): void{
    this.structuresService.getStructures().subscribe((structures) => {
      this.structures = structures;
    });
  }

  removeStructure(structure: Structure, event){
    event.stopPropagation();
    this.structuresService.removeStructure(structure.id).subscribe(() => {
      this.loadStructures();
    });
  }

  goToStructureDetails(structure: Structure){
    this.router.navigate(['/structures', structure.id]);
  }
}
