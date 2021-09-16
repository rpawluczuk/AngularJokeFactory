import { Component, OnInit } from '@angular/core';
import {OriginService} from '../origin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {OriginCreatorDto} from '../models/originCreatorDto';
import {OriginCreatorChildDto} from "../models/originCreatorChildDto";

@Component({
  selector: 'app-origin-details',
  templateUrl: './origin-edition.component.html',
  styleUrls: ['./origin-edition.component.css']
})
export class OriginEditionComponent implements OnInit {

  originCreator: OriginCreatorDto;
  isOriginEditionDemanded = false;
  isChildOriginCreationDemanded = false;
  faPlus = faPlus;

  constructor(private originService: OriginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadOrigin(this.route.snapshot.data.origin.name);
  }

  loadOrigin(originName: string) {
    this.originService.getOriginCreator(originName).subscribe(originCreator => {
      this.originCreator = originCreator;
    });
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  onOriginEditionRequest(isOriginEditionDemanded: boolean) {
    this.isOriginEditionDemanded = isOriginEditionDemanded;
  }

  onChildOriginCreationRequest(isChildOriginCreationDemanded: boolean) {
    this.isChildOriginCreationDemanded = isChildOriginCreationDemanded;
    this.loadOrigin(this.originCreator.name);
  }

  onRemoveOriginRelationRequest(originCreatorChild: OriginCreatorChildDto) {
    this.originService.removeOriginRelation(originCreatorChild.parentId, originCreatorChild?.id).subscribe(() => {
      this.loadOrigin(this.originCreator.name);
    });
  }

  onAddChildOriginDemand() {
    this.isChildOriginCreationDemanded = true;
  }
}


