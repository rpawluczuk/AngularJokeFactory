import {Component, Input, OnInit} from '@angular/core';
import {StructuresService} from '../../../../../structures/structures.service';
import {JokePresenterDto} from '../../../../models/jokePresenterDto';
import {JokeBlocksService} from '../../../../../blocks/joke-blocks/joke-blocks.service';
import {StructureItemDto} from '../../../../../structures/models/structureItemDto';
import {JokeBlockDto} from '../../../../../blocks/joke-blocks/models/joke-block-dto';

@Component({
  selector: 'app-single-joke-details',
  templateUrl: './single-joke-details.component.html',
  styleUrls: ['./single-joke-details.component.css']
})
export class SingleJokeDetailsComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;

  structureItemList: StructureItemDto[] = [];
  currentStructureItem: StructureItemDto;
  jokeBlocks: JokeBlockDto[] = [];
  currentStructureIndex = 1;

  constructor(private structuresService: StructuresService,
              private jokeBlocksService: JokeBlocksService) {
  }

  ngOnInit(): void {
    this.loadBlocksOfTheJoke();
    this.loadStructuresOfTheJoke();
  }

  loadStructuresOfTheJoke(){
    this.structuresService.getStructuresByJokeID(this.jokePresenter.id).subscribe((structureItemList) => {
      this.structureItemList = structureItemList;
      if (structureItemList.length > 0){
        this.currentStructureItem = structureItemList[0];
      }
    });
  }

  loadBlocksOfTheJoke(): void {
    this.jokeBlocksService.getBlocksOfTheJoke(this.jokePresenter.id).subscribe((jokeBlocks) => {
      this.jokeBlocks = jokeBlocks;
    });
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.currentStructureIndex = SelectedStructureIndex;
    this.currentStructureItem = this.structureItemList[SelectedStructureIndex - 1];
  }
}
