import {Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {JokeBlockCreatorComponent} from '../../../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {JokeBlockCreatorDto} from '../../../../blocks/joke-blocks/models/jokeBlockCreatorDto';
import {StructureItemDto} from '../../../../structures/models/structureItemDto';
import {JokeBlocksService} from '../../../../blocks/joke-blocks/joke-blocks.service';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-structure-panel',
  templateUrl: './structure-panel.component.html',
  styleUrls: ['./structure-panel.component.css']
})
export class StructurePanelComponent implements OnChanges {

  @Input()
  structureItem: StructureItemDto;

  @ViewChildren('jokeBlockRef')
  jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  jokeBlockCreatorList: JokeBlockCreatorDto[] = [];
  structureItemList: StructureItemDto[] = [];

  faLongArrowAltDown = faLongArrowAltDown;

  currentStructureIndex = 0;

  constructor(private jokeBlocksService: JokeBlocksService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.structureItem?.currentValue) {
      this.structureItem = changes.structureItem?.currentValue;
      if (this.structureItemList.map(si => si.id).includes(this.structureItem.id)) {
        this.structureItemList = this.structureItemList.filter(si => si.id !== this.structureItem.id);
        this.jokeBlockCreatorList = this.jokeBlockCreatorList.filter(jb => jb.structureId !== this.structureItem.id);
      } else {
        this.structureItemList.push(changes.structureItem.currentValue);
        this.jokeBlocksService.getJokeBlockCreatorListByStructure(this.structureItem.id).subscribe(jokeBlockList => {
          this.jokeBlockCreatorList = this.jokeBlockCreatorList.concat(jokeBlockList);
        });
      }
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.updateJokeBlockCreatorListByFormValues();
    this.currentStructureIndex = SelectedStructureIndex;
  }

  getJokeBlockCreatorList(): JokeBlockCreatorDto[] {
    this.updateJokeBlockCreatorListByFormValues();
    return this.jokeBlockCreatorList;
  }

  private updateJokeBlockCreatorListByFormValues(): void {
    this.jokeBlockComponents.forEach(child => {
      const jokeBlockFromForm = child.saveJokeBlockValue();
      const index = this.jokeBlockCreatorList
        .map(jb => jb?.structureBlockPresenterDto?.id)
        .indexOf(jokeBlockFromForm?.structureBlockPresenterDto?.id);
      this.jokeBlockCreatorList[index] = jokeBlockFromForm;
    });
  }
}
