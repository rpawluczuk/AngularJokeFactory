import {Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {JokeBlockCreatorComponent} from '../../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {JokeBlockDto} from '../../../blocks/joke-blocks/models/joke-block-dto';
import {StructureItemDto} from '../../../structures/models/StructureItemDto';
import {JokeBlocksService} from '../../../blocks/joke-blocks/joke-blocks.service';

@Component({
  selector: 'app-structure-panel',
  templateUrl: './structure-panel.component.html',
  styleUrls: ['./structure-panel.component.css']
})
export class StructurePanelComponent implements OnChanges {

  @Input()
  structureItemDto: StructureItemDto;

  @ViewChildren('jokeBlockRef')
  jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  jokeBlockDtoList: JokeBlockDto[] = [];
  structureItemDtoList: StructureItemDto[] = [];

  currentStructureIndex = 0;

  constructor(private jokeBlocksService: JokeBlocksService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.structureItemDto.currentValue) {
      this.structureItemDto = changes.structureItemDto.currentValue;
      if (this.structureItemDtoList.map(si => si.id).includes(this.structureItemDto.id)) {
        this.structureItemDtoList = this.structureItemDtoList.filter(si => si.id !== this.structureItemDto.id);
        this.jokeBlockDtoList = this.jokeBlockDtoList.filter(jb => jb.structureId !== this.structureItemDto.id);
      } else {
        this.structureItemDtoList.push(changes.structureItemDto.currentValue);
        this.jokeBlocksService.getJokeBlocksOfTheStructure(this.structureItemDto.id).subscribe(jokeBlockList => {
          this.jokeBlockDtoList = this.jokeBlockDtoList.concat(jokeBlockList);
        });
      }
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.updateJokeBlockDtoListByFormValues();
    this.currentStructureIndex = SelectedStructureIndex;
  }

  getJokeBlockDtoList(): JokeBlockDto[] {
    this.updateJokeBlockDtoListByFormValues();
    return this.jokeBlockDtoList;
  }

  private updateJokeBlockDtoListByFormValues(): void {
    this.jokeBlockComponents.forEach(child => {
      const jokeBlockFromForm = child.saveJokeBlockValue();
      const index = this.jokeBlockDtoList
        .map(jb => jb?.structureBlockId)
        .indexOf(jokeBlockFromForm.structureBlockId);
      this.jokeBlockDtoList[index] = jokeBlockFromForm;
    });
  }
}
