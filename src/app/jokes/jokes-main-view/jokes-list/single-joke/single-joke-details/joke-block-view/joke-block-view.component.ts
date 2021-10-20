import {Component, Input, OnInit} from '@angular/core';
import {StructureItemDto} from '../../../../../../structures/models/structureItemDto';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {StructuresService} from "../../../../../../structures/structures.service";
import {JokePresenterDto} from "../../../../../models/jokePresenterDto";
import {JokeBlockPresenterDto} from "../../../../../../blocks/joke-blocks/models/jokeBlockPresenterDto";
import {JokeBlocksService} from "../../../../../../blocks/joke-blocks/joke-blocks.service";

@Component({
  selector: 'app-joke-block-view',
  templateUrl: './joke-block-view.component.html',
  styleUrls: ['./joke-block-view.component.css']
})
export class JokeBlockViewComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;

  faLongArrowAltDown = faLongArrowAltDown;
  structureItemList: StructureItemDto[] = [];
  jokeBlockPresenterList: JokeBlockPresenterDto[] = [];
  currentStructureItem: StructureItemDto;
  currentStructureIndex = 1;

  constructor(private structuresService: StructuresService,
              private jokeBlocksService: JokeBlocksService) { }

  ngOnInit(): void {
    this.loadStructuresOfTheJoke();
    this.loadBlocksOfTheJoke();
  }

  loadStructuresOfTheJoke() {
    this.structuresService.getStructuresByJokeID(this.jokePresenter?.id).subscribe((structureItemList) => {
      this.structureItemList = structureItemList;
      if (structureItemList.length > 0) {
        this.currentStructureItem = structureItemList[0];
      }
    });
  }

  loadBlocksOfTheJoke(): void {
    this.jokeBlocksService.getJokeBlockPresenterList(this.jokePresenter?.id).subscribe((jokeBlocks) => {
      this.jokeBlockPresenterList = jokeBlocks;
    });
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.currentStructureIndex = SelectedStructureIndex;
    this.currentStructureItem = this.structureItemList[SelectedStructureIndex - 1];
  }
}
