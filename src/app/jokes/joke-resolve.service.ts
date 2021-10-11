import {JokesService} from './jokes.service';
import {Joke} from './models/joke';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {JokeCreatorDto} from "./models/jokeCreatorDto";

@Injectable()
export class JokeResolveService implements Resolve<JokeCreatorDto>{

  constructor(private jokeService: JokesService) {}

  resolve(route: ActivatedRouteSnapshot){
    return this.jokeService.getJokeCreator(route.params.id);
  }
}
