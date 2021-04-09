import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {Structure} from './models/structure';
import {StructuresService} from './structures.service';

@Injectable()
export class StructureResolveService implements Resolve<Structure>{

  constructor(private structureService: StructuresService) {}

  resolve(route: ActivatedRouteSnapshot){
    return this.structureService.getStructure(route.params.id);
  }
}
