import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {StructuresService} from './structures.service';
import {StructureCreatorDto} from './models/structureCreatorDto';

@Injectable()
export class StructureResolveService implements Resolve<StructureCreatorDto>{

  constructor(private structureService: StructuresService) {}

  resolve(route: ActivatedRouteSnapshot){
    return this.structureService.getStructureCreatorDto(route.params.id);
  }
}
