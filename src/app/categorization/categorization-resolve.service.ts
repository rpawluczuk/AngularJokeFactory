import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CategorizationCreatorDto} from './models/CategorizationCreatorDto';
import {CategorizationService} from './categorization.service';

@Injectable()
export class CategorizationResolveService implements Resolve<CategorizationCreatorDto>{

  constructor(private categorizationService: CategorizationService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.categorizationService.getCategorizationCreator(route.params.id);
  }
}
