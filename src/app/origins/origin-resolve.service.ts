import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {OriginService} from './origin.service';
import {OriginCreatorDto} from './models/originCreatorDto';

@Injectable()
export class OriginResolveService implements Resolve<OriginCreatorDto>{

  constructor(private originService: OriginService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.originService.getOriginCreator(route.params.id);
  }
}
