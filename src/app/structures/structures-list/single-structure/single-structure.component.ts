import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Structure} from '../../models/structure';
import {Router} from '@angular/router';
import {StructureBlocksService} from '../../../blocks/structure-blocks/structure-blocks.service';

@Component({
  selector: 'app-single-structure',
  templateUrl: './single-structure.component.html',
  styleUrls: ['./single-structure.component.css']
})
export class SingleStructureComponent implements OnInit {
  @Input() structure: Structure;
  @Output() removedStructure: EventEmitter<number> = new EventEmitter<number>();

  isDetailsButtonClicked: boolean;

  constructor(private router: Router,
              private blocksService: StructureBlocksService) {
  }

  ngOnInit(): void {
    this.loadBlocksOfTheStructure();
    this.isDetailsButtonClicked = false;
  }

  loadBlocksOfTheStructure(): void {
    this.blocksService.getBlocksOfTheStructure(this.structure.id).subscribe((blocks) => {
      this.structure.blockScheme = blocks;
    });
  }

  removeStructure(structure: Structure, event) {
    event.stopPropagation();
    this.removedStructure.emit(structure.id);
  }

  goToStructureEdition() {
    this.router.navigate(['/structures', this.structure.id]);
  }

  showStructureDetails() {
    this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
  }
}
