import {Component, Input, OnInit} from '@angular/core';
import {StructurePresenterDto} from '../../../models/structurePresenterDto';
import {StructureBlockPresenterDto} from '../../../../blocks/structure-blocks/models/structureBlockPresenterDto';
import {StructureBlocksService} from '../../../../blocks/structure-blocks/structure-blocks.service';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-structure-details',
  templateUrl: './single-structure-details.component.html',
  styleUrls: ['./single-structure-details.component.css']
})
export class SingleStructureDetailsComponent implements OnInit {
  @Input() structurePresenter: StructurePresenterDto;

  faLongArrowAltDown = faLongArrowAltDown;
  structureBlockPresenterList: StructureBlockPresenterDto[];

  constructor(private structureBlockService: StructureBlocksService) {
  }

  ngOnInit(): void {
    this.loadStructureBlockList();
  }

  private loadStructureBlockList() {
    this.structureBlockService.getStructureBlockPresenterList(this.structurePresenter.id).subscribe(presenterList => {
      this.structureBlockPresenterList = presenterList;
    });
  }
}
