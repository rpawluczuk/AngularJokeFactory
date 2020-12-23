import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Origin} from './models/origin';
import {OriginService} from './origin.service';

@Injectable()
export class OriginResolveService implements Resolve<Origin>{

  constructor(private originService: OriginService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.originService.getOrigin(route.params.id);
  }
}
