import {
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {JokeBlocksWithStructureDto} from '../../../blocks/joke-blocks/models/joke-blocks-wtih-structure-dto';
import {JokeBlockCreatorComponent} from '../../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {JokeBlockDto} from '../../../blocks/joke-blocks/models/joke-block-dto';
import {Joke} from '../../models/joke';
import {JokeBlocksService} from '../../../blocks/joke-blocks/joke-blocks.service';

@Component({
  selector: 'app-joke-blocks-edition-panel',
  templateUrl: './joke-blocks-edition-panel.component.html',
  styleUrls: ['./joke-blocks-edition-panel.component.css']
})
export class JokeBlocksEditionPanelComponent implements OnChanges, OnInit {

  @Input()
  jokeBlocksWithStructureDto: JokeBlocksWithStructureDto;

  @Input()
  joke: Joke;

  @ViewChildren('jokeBlocksEditionRef')
  jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  jokeBlockDtoList: JokeBlockDto[] = [];
  selectedStructures: string[] = [];
  currentStructureIndex = 0;
  nameOfCurrentStructure: string;

  constructor(private jokeBlocksService: JokeBlocksService) {
  }

  ngOnInit(): void {
    this.loadJokeBlocks();
  }

  loadJokeBlocks() {
    this.jokeBlocksService.getExisitngJokeBlocksOfTheStructure(this.joke?.id).subscribe(jokeBlocksWithStructureDtoList => {
      jokeBlocksWithStructureDtoList.forEach(jokeBlocksWithStructureDto => {
        const countOfSelectedStructures = this.selectedStructures.length;
        if (countOfSelectedStructures === 0) {
          this.nameOfCurrentStructure = jokeBlocksWithStructureDto?.structureName;
        }
        this.selectedStructures.push(jokeBlocksWithStructureDto?.structureName);
        this.jokeBlockDtoList = this.jokeBlockDtoList.concat(jokeBlocksWithStructureDto?.jokeBlocksDto);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jokeBlocksWithStructureDto.currentValue) {
      this.jokeBlocksWithStructureDto = changes.jokeBlocksWithStructureDto.currentValue;
      const countOfSelectedStructures = this.selectedStructures.length;
      if (countOfSelectedStructures === 0) {
        this.nameOfCurrentStructure = this.jokeBlocksWithStructureDto?.structureName;
      }
      if (this.selectedStructures.includes(this.jokeBlocksWithStructureDto.structureName)) {
        this.selectedStructures = this.selectedStructures
          .filter(structureName => structureName !== this.jokeBlocksWithStructureDto.structureName);
        this.jokeBlockDtoList = this.jokeBlockDtoList
          .filter(jokeBlock => jokeBlock.structureName !== this.jokeBlocksWithStructureDto.structureName);
      } else {
        this.selectedStructures.push(this.jokeBlocksWithStructureDto.structureName);
        this.jokeBlockDtoList = this.jokeBlockDtoList.concat(this.jokeBlocksWithStructureDto.jokeBlocksDto);
      }
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.updateJokeBlockDtoListByFormValues();
    this.currentStructureIndex = SelectedStructureIndex;
    this.nameOfCurrentStructure = this.selectedStructures[SelectedStructureIndex - 1];
  }

  getJokeBlocksWithStructureDtoList(): JokeBlockDto[] {
    this.updateJokeBlockDtoListByFormValues();
    return this.jokeBlockDtoList;
  }

  private updateJokeBlockDtoListByFormValues(): void {
    this.jokeBlockComponents.forEach(child => {
      const jokeBlockFromForm = child.saveJokeBlockValue();
      const index = this.jokeBlockDtoList
        .map(jokeBlockDto => jokeBlockDto.structureBlockId)
        .indexOf(jokeBlockFromForm.structureBlockId);
      this.jokeBlockDtoList[index] = jokeBlockFromForm;
    });
  }
}
