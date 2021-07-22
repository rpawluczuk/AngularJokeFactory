import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Joke} from '../../../models/joke';
import {Router} from '@angular/router';
import {JokeBlocksService} from '../../../../blocks/joke-blocks/joke-blocks.service';
import {JokeBlock} from '../../../../blocks/joke-blocks/models/joke-block';
import {Structure} from '../../../../structures/models/structure';
import {StructuresService} from '../../../../structures/structures.service';

@Component({
  selector: 'app-single-joke',
  templateUrl: './single-joke.component.html',
  styleUrls: ['./single-joke.component.css']
})
export class SingleJokeComponent implements OnInit {
  @Input() joke: Joke;
  @Output() removeJokeRequest: EventEmitter<number> = new EventEmitter<number>();

  structuresOfTheJoke: Structure[];
  currentStructure: Structure;
  jokeBlocks: JokeBlock[] = [];
  isDetailsButtonClicked: boolean;
  currentStructureIndex = 1;

  constructor(private router: Router,
              private jokeBlocksService: JokeBlocksService,
              private structuresService: StructuresService) {
  }

  ngOnInit(): void {
    this.isDetailsButtonClicked = false;
  }

  loadBlocksOfTheJoke(): void {
    this.jokeBlocksService.getBlocksOfTheJoke(this.joke.id).subscribe((jokeBlocks) => {
      this.jokeBlocks = jokeBlocks;
    });
  }

  loadStructuresOfTheJoke(){
    this.structuresService.getStructuresByJokeID(this.joke.id).subscribe((structures) => {
      this.structuresOfTheJoke = structures;
      if (structures.length > 0){
        console.log(structures);
        this.currentStructure = structures[0];
      }
    });
  }

  removeJoke(joke: Joke, event) {
    event.stopPropagation();
    this.removeJokeRequest.emit(joke.id);
  }

  goToJokeEdition() {
    this.router.navigate(['/jokes', this.joke.id]);
  }

  showJokeDetails() {
    this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
    if (this.isDetailsButtonClicked){
      this.loadBlocksOfTheJoke();
      this.loadStructuresOfTheJoke();
    }
  }

  getAuthorNameAndSurname(joke: Joke): string {
    if (joke.author === undefined || joke.author === null) {
      return 'any author';
    } else {
      return joke.author.name + ' ' + joke.author.surname;
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number){
    this.currentStructureIndex = SelectedStructureIndex;
    this.currentStructure = this.structuresOfTheJoke[SelectedStructureIndex - 1];
  }
}
