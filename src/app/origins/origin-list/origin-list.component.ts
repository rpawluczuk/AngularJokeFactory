import { Component, OnInit } from '@angular/core';
import {Origin} from '../models/origin';
import {OriginService} from '../origin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-origin-list',
  templateUrl: './origin-list.component.html',
  styleUrls: ['./origin-list.component.css']
})
export class OriginListComponent implements OnInit {

  origins: Origin[];

  constructor(private originService: OriginService,
              private  router: Router) { }

  ngOnInit(): void {
    this.loadOrigins();
  }

  private loadOrigins() {
    this.originService.getOrigins().subscribe(origins => {
      this.origins = origins;
    });
  }

  removeOrigin(origin: Origin, event){
    event.stopPropagation();
    this.originService.removeOrigin(origin.id).subscribe(() => {
      this.loadOrigins();
    });
  }

  goToOriginDetails(origin: Origin) {
    this.router.navigate(['/origins', origin.id]);
  }
}
