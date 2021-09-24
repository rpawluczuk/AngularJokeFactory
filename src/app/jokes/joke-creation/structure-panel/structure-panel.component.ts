import {Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {JokeBlockCreatorComponent} from '../../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {JokeBlocksWithStructureDto} from '../../../blocks/joke-blocks/models/joke-blocks-wtih-structure-dto';
import {JokeBlockDto} from '../../../blocks/joke-blocks/models/joke-block-dto';

@Component({
  selector: 'app-structure-panel',
  templateUrl: './structure-panel.component.html',
  styleUrls: ['./structure-panel.component.css']
})
export class StructurePanelComponent implements OnChanges {

  @Input()
  jokeBlocksWithStructureDto: JokeBlocksWithStructureDto;

  @ViewChildren('jokeBlockRef')
  jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;
  jokeBlocksWithStructureDtoList: JokeBlocksWithStructureDto[] = [];

  currentStructureIndex = 0;
  nameOfCurrentStructure: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jokeBlocksWithStructureDto.currentValue) {
      this.jokeBlocksWithStructureDto = changes.jokeBlocksWithStructureDto.currentValue;
      const countOfSelectedStructures = this.jokeBlocksWithStructureDtoList.length;
      if (countOfSelectedStructures === 0) {
        this.nameOfCurrentStructure = this.jokeBlocksWithStructureDto?.structureItemDto?.text;
      }
      const selectedStructures = this.jokeBlocksWithStructureDtoList.map(jbs => jbs?.structureItemDto?.text);
      if (selectedStructures.includes(this.jokeBlocksWithStructureDto?.structureItemDto?.text)) {
        this.jokeBlocksWithStructureDtoList = this.jokeBlocksWithStructureDtoList
          .filter(jbs => jbs?.structureItemDto?.text !== this.jokeBlocksWithStructureDto?.structureItemDto?.text);
      } else {
        this.jokeBlocksWithStructureDtoList.push(this.jokeBlocksWithStructureDto);
      }
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.updateJokeBlockDtoListByFormValues();
    this.currentStructureIndex = SelectedStructureIndex;
    this.nameOfCurrentStructure = this.jokeBlocksWithStructureDtoList[SelectedStructureIndex - 1]?.structureItemDto?.text;
  }

  getJokeBlocksWithStructureDtoList(): JokeBlocksWithStructureDto[] {
    this.updateJokeBlockDtoListByFormValues();
    return this.jokeBlocksWithStructureDtoList;
  }

  private updateJokeBlockDtoListByFormValues(): void {
    this.jokeBlockComponents.forEach(child => {
      const jokeBlockFromForm = child.saveJokeBlockValue();

      const indexOfJBSDtoList = this.jokeBlocksWithStructureDtoList
        .map(jbs => jbs?.structureItemDto?.text)
        .indexOf(jokeBlockFromForm.structureName);

      const indexOfJBList = this.jokeBlocksWithStructureDtoList[indexOfJBSDtoList].jokeBlocksDto
        .map(jb => jb.structureBlockId)
        .indexOf(jokeBlockFromForm.structureBlockId);

      this.jokeBlocksWithStructureDtoList[indexOfJBSDtoList].jokeBlocksDto[indexOfJBList] = jokeBlockFromForm;
    });
  }
}
