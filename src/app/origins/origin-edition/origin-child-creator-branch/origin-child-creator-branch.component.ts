import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OriginCreatorChildDto} from '../../models/originCreatorChildDto';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {OriginCreatorChildrenWithParentId} from '../../models/OriginCreatorChildrenWithParentId';
import {OriginService} from '../../origin.service';

@Component({
  selector: 'app-origin-child-creator-branch',
  templateUrl: './origin-child-creator-branch.component.html',
  styleUrls: ['./origin-child-creator-branch.component.css']
})
export class OriginChildCreatorBranchComponent implements OnInit {
  @Input() originCreatorChildrenWithParent: OriginCreatorChildrenWithParentId;
  @Input() index: number;
  @Output() setAsMainRequest: EventEmitter<OriginCreatorChildDto> = new EventEmitter<OriginCreatorChildDto>();
  @Output() showChildrenOfChildRequest: EventEmitter<OriginCreatorChildDto> = new EventEmitter<OriginCreatorChildDto>();
  @Output() handleBranchIndex: EventEmitter<number> = new EventEmitter<number>();

  isChildOriginCreationDemanded = false;
  chosenOriginCreatorChildId: number;
  faPlus = faPlus;

  constructor(private originService: OriginService) {
  }

  ngOnInit(): void {
  }

  onRemoveOriginRelationRequest(originCreatorChild: OriginCreatorChildDto) {
    this.originService.removeOriginRelation(originCreatorChild.parentId, originCreatorChild?.id).subscribe(() => {
      this.reloadOriginCreatorChildren();
    });
  }

  onSetAsMainRequest(originCreatorChildDto: OriginCreatorChildDto) {
    this.setAsMainRequest.emit(originCreatorChildDto);
  }

  onshowChildrenOfChildRequest(originCreatorChildDto: OriginCreatorChildDto) {
    this.chosenOriginCreatorChildId = originCreatorChildDto.id;
    this.handleBranchIndex.emit(this.index);
    this.showChildrenOfChildRequest.emit(originCreatorChildDto);
  }

  onAddChildOriginDemand() {
    this.isChildOriginCreationDemanded = true;
  }

  onChildOriginCreationRequest(isChildOriginCreationDemanded: boolean) {
    this.isChildOriginCreationDemanded = isChildOriginCreationDemanded;
    this.reloadOriginCreatorChildren();
  }

  reloadOriginCreatorChildren(){
    this.originService.getOriginCreatorChildList(this.originCreatorChildrenWithParent.parentId).subscribe(originCreatorChildren => {
      this.originCreatorChildrenWithParent.originCreatorChildren = originCreatorChildren;
    });
  }
}
