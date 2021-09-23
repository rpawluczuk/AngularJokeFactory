import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {JokeBlocksService} from '../../../../blocks/joke-blocks/joke-blocks.service';
import {JokeBlock} from '../../../../blocks/joke-blocks/models/joke-block';
import {Structure} from '../../../../structures/models/structure';
import {StructuresService} from '../../../../structures/structures.service';
import {JokePresenterDto} from '../../../models/jokePresenterDto';

@Component({
  selector: 'app-single-joke',
  templateUrl: './single-joke.component.html',
  styleUrls: ['./single-joke.component.css']
})
export class SingleJokeComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;
  @Output() removeJokeRequest: EventEmitter<number> = new EventEmitter<number>();

  structuresOfTheJoke: Structure[] = [];
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
    this.jokeBlocksService.getBlocksOfTheJoke(this.jokePresenter.id).subscribe((jokeBlocks) => {
      this.jokeBlocks = jokeBlocks;
    });
  }

  loadStructuresOfTheJoke(){
    this.structuresService.getStructuresByJokeID(this.jokePresenter.id).subscribe((structures) => {
      this.structuresOfTheJoke = structures;
      if (structures.length > 0){
        this.currentStructure = structures[0];
      }
    });
  }

  removeJoke(jokePresenter: JokePresenterDto, event) {
    event.stopPropagation();
    this.removeJokeRequest.emit(jokePresenter.id);
  }

  goToJokeEdition() {
    this.router.navigate(['/jokes', this.jokePresenter.id]);
  }

  showJokeDetails() {
    this.isDetailsButtonClicked = !this.isDetailsButtonClicked;
    if (this.isDetailsButtonClicked){
      this.loadBlocksOfTheJoke();
      this.loadStructuresOfTheJoke();
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number){
    this.currentStructureIndex = SelectedStructureIndex;
    this.currentStructure = this.structuresOfTheJoke[SelectedStructureIndex - 1];
  }
}
