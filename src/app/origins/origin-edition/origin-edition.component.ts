import { Component, OnInit } from '@angular/core';
import {Origin} from '../models/origin';
import {OriginService} from '../origin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-origin-details',
  templateUrl: './origin-edition.component.html',
  styleUrls: ['./origin-edition.component.css']
})
export class OriginEditionComponent implements OnInit {

  origin: Origin;
  isOriginEditionDemanded = false;

  constructor(private originService: OriginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadOrigin();
  }

  loadOrigin() {
    this.origin = this.route.snapshot.data.origin;
  }

  reloadOrigin() {
    this.originService.getOrigin(this.origin.id).subscribe(origin => {
      this.origin = origin;
    });
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  onOriginEditionRequest(isOriginEditionDemanded: boolean) {
    this.isOriginEditionDemanded = isOriginEditionDemanded;
  }

  onRemoveOriginRelationRequest(childOriginId: number) {
    this.originService.removeOriginRelation(this.origin.id, childOriginId).subscribe(() => {
      this.reloadOrigin();
    });
  }
}


