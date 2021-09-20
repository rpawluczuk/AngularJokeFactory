import { Component, OnInit } from '@angular/core';
import {OriginService} from '../origin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OriginCreatorDto} from '../models/originCreatorDto';
import {OriginCreatorChildDto} from '../models/originCreatorChildDto';
import {OriginCreatorChildrenWithParentId} from '../models/OriginCreatorChildrenWithParentId';

@Component({
  selector: 'app-origin-details',
  templateUrl: './origin-edition.component.html',
  styleUrls: ['./origin-edition.component.css']
})
export class OriginEditionComponent implements OnInit {

  originCreator: OriginCreatorDto;
  originCreatorFamily: OriginCreatorChildrenWithParentId[] = [];
  isOriginEditionDemanded = false;

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
      this.originCreatorFamily.push(new OriginCreatorChildrenWithParentId(originCreator.children, originCreator.id));
    });
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  onOriginEditionRequest(isOriginEditionDemanded: boolean) {
    this.isOriginEditionDemanded = isOriginEditionDemanded;
  }

  onSetAsMainRequest(originCreatorChild: OriginCreatorChildDto) {
    this.loadOrigin(originCreatorChild?.name);
  }

  onshowChildrenOfChildRequest(originCreatorChild: OriginCreatorChildDto) {
    this.originService.getOriginCreatorChildList(originCreatorChild.id).subscribe(originCreatorChildren => {
      this.originCreatorFamily.push(new OriginCreatorChildrenWithParentId(originCreatorChildren, originCreatorChild.id));
    });
  }
}


