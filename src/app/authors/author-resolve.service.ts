import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AuthorsService} from './authors.service';
import {AuthorCreatorDto} from './models/authorCreatorDto';

@Injectable()
export class AuthorResolveService implements Resolve<AuthorCreatorDto>{

  constructor(private authorsService: AuthorsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.authorsService.getAuthorCreator(route.params.id);
  }
}
