import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {StructurePresenterDto} from '../../models/structurePresenterDto';

@Component({
  selector: 'app-single-structure',
  templateUrl: './single-structure.component.html',
  styleUrls: ['./single-structure.component.css']
})
export class SingleStructureComponent implements OnInit {

  @Input()
  structurePresenter: StructurePresenterDto;

  @Output()
  removedStructure: EventEmitter<number> = new EventEmitter<number>();

  isDetailsButtonClicked: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isDetailsButtonClicked = false;
  }

  removeStructure(structurePresenter: StructurePresenterDto, event) {
    event.stopPropagation();
    this.removedStructure.emit(structurePresenter.id);
  }

  goToStructureEdition() {
    this.router.navigate(['/structures', this.structurePresenter.id]);
  }

  showStructureDetails() {
    this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
  }
}
