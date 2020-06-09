import {JokesService} from './jokes.service';
import {Joke} from './models/joke';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class JokeResolveService implements Resolve<Joke>{

  constructor(private jokeService: JokesService) {}

  resolve(route: ActivatedRouteSnapshot){
    return this.jokeService.getJoke(route.params.id);
  }
}
