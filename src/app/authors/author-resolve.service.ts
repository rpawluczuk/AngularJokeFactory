import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Author} from './models/author';
import {AuthorsService} from './authors.service';

@Injectable()
export class AuthorResolveService implements Resolve<Author>{

  constructor(private authorsService: AuthorsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.authorsService.getAuthor(route.params.id);
  }
}
