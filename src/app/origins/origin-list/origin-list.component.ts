import { Component, OnInit } from '@angular/core';
import {Origin} from '../models/origin';
import {OriginService} from '../origin.service';
import {Router} from '@angular/router';
import {OriginPresenterDto} from '../models/originPresenterDto';

@Component({
  selector: 'app-origin-list',
  templateUrl: './origin-list.component.html',
  styleUrls: ['./origin-list.component.css']
})
export class OriginListComponent implements OnInit {

  originPresenterList: OriginPresenterDto[];

  constructor(private originService: OriginService,
              private  router: Router) { }

  ngOnInit(): void {
    this.loadOrigins();
  }

  private loadOrigins() {
    this.originService.getOrigins().subscribe(originPresenterList => {
      this.originPresenterList = originPresenterList;
    });
  }

  removeOrigin(originPresenter: OriginPresenterDto, event){
    event.stopPropagation();
    this.originService.removeOrigin(originPresenter.id).subscribe(() => {
      this.loadOrigins();
    });
  }

  goToOriginEdition(originPresenter: OriginPresenterDto) {
    this.router.navigate(['/origins', originPresenter.id]);
  }
}
