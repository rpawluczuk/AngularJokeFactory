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
  jokeBlocksWithStructureDtoList: JokeBlocksWithStructureDto[] = [];

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
        const countOfSelectedStructures = this.jokeBlocksWithStructureDtoList.length;
        if (countOfSelectedStructures === 0) {
          this.nameOfCurrentStructure = jokeBlocksWithStructureDto?.structureName;
        }
        this.jokeBlocksWithStructureDtoList.push(jokeBlocksWithStructureDto);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jokeBlocksWithStructureDto.currentValue) {
      this.jokeBlocksWithStructureDto = changes.jokeBlocksWithStructureDto.currentValue;
      const countOfSelectedStructures = this.jokeBlocksWithStructureDtoList.length;
      if (countOfSelectedStructures === 0) {
        this.nameOfCurrentStructure = this.jokeBlocksWithStructureDto?.structureName;
      }
      const selectedStructures = this.jokeBlocksWithStructureDtoList.map(jbs => jbs.structureName);
      if (selectedStructures.includes(this.jokeBlocksWithStructureDto.structureName)) {
        this.jokeBlocksWithStructureDtoList = this.jokeBlocksWithStructureDtoList
          .filter(jbs => jbs.structureName !== this.jokeBlocksWithStructureDto.structureName);
      } else {
        this.jokeBlocksWithStructureDtoList.push(this.jokeBlocksWithStructureDto);
      }
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.updateJokeBlockDtoListByFormValues();
    this.currentStructureIndex = SelectedStructureIndex;
    this.nameOfCurrentStructure = this.jokeBlocksWithStructureDtoList[SelectedStructureIndex - 1]?.structureName;
  }

  getJokeBlocksWithStructureDtoList(): JokeBlocksWithStructureDto[] {
    this.updateJokeBlockDtoListByFormValues();
    return this.jokeBlocksWithStructureDtoList;
  }

  private updateJokeBlockDtoListByFormValues(): void {
    this.jokeBlockComponents.forEach(child => {
      const jokeBlockFromForm = child.saveJokeBlockValue();

      const indexOfJBSDtoList = this.jokeBlocksWithStructureDtoList
        .map(jbs => jbs.structureName)
        .indexOf(jokeBlockFromForm.structureName);

      const indexOfJBList = this.jokeBlocksWithStructureDtoList[indexOfJBSDtoList].jokeBlocksDto
        .map(jb => jb.structureBlockId)
        .indexOf(jokeBlockFromForm.structureBlockId);

      this.jokeBlocksWithStructureDtoList[indexOfJBSDtoList].jokeBlocksDto[indexOfJBList] = jokeBlockFromForm;
    });
  }
}
