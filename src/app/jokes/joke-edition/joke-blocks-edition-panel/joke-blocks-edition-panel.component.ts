import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {JokeBlockCreatorComponent} from '../../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {JokeBlocksService} from '../../../blocks/joke-blocks/joke-blocks.service';
import {JokeCreatorDto} from '../../models/jokeCreatorDto';
import {StructureItemDto} from '../../../structures/models/structureItemDto';
import {JokeBlockCreatorDto} from '../../../blocks/joke-blocks/models/jokeBlockCreatorDto';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-joke-blocks-edition-panel',
  templateUrl: './joke-blocks-edition-panel.component.html',
  styleUrls: ['./joke-blocks-edition-panel.component.css']
})
export class JokeBlocksEditionPanelComponent implements OnChanges, OnInit {

  @Input()
  structureItemDto: StructureItemDto;

  @Input()
  jokeCreator: JokeCreatorDto;

  @ViewChildren('jokeBlocksEditionRef')
  jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  faLongArrowAltDown = faLongArrowAltDown;

  jokeBlockCreatorList: JokeBlockCreatorDto[] = [];
  structureItemList: StructureItemDto[] = [];

  currentStructureIndex = 0;

  constructor(private jokeBlocksService: JokeBlocksService) {
  }

  ngOnInit(): void {
    this.loadJokeBlocks();
    this.structureItemList = this.jokeCreator?.structureItemList;
  }

  loadJokeBlocks() {
    this.jokeBlocksService.getJokeBlockCreatorList(this.jokeCreator?.id).subscribe(jokeBlockDtoList => {
      jokeBlockDtoList.forEach(jokeBlockDto => {
        this.jokeBlockCreatorList.push(jokeBlockDto);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.structureItemDto?.currentValue) {
      this.structureItemDto = changes.structureItemDto.currentValue;
      if (this.structureItemList.map(si => si.id).includes(this.structureItemDto.id)) {
        this.structureItemList = this.structureItemList.filter(si => si.id !== this.structureItemDto.id);
        this.jokeBlockCreatorList = this.jokeBlockCreatorList.filter(jb => jb.structureId !== this.structureItemDto.id);
      } else {
        this.structureItemList.push(changes.structureItemDto.currentValue);
        this.jokeBlocksService.getJokeBlockCreatorListByStructure(this.structureItemDto.id).subscribe(jokeBlockList => {
          this.jokeBlockCreatorList = this.jokeBlockCreatorList.concat(jokeBlockList);
        });
      }
    }
  }

  changeCurrentStructure(SelectedStructureIndex: number) {
    this.updateJokeBlockDtoListByFormValues();
    this.currentStructureIndex = SelectedStructureIndex;
  }

  getJokeBlockDtoList(): JokeBlockCreatorDto[] {
    this.updateJokeBlockDtoListByFormValues();
    return this.jokeBlockCreatorList;
  }

  private updateJokeBlockDtoListByFormValues(): void {
    this.jokeBlockComponents.forEach(child => {
      const jokeBlockFromForm = child.saveJokeBlockValue();
      const index = this.jokeBlockCreatorList
        .map(jb => jb?.structureBlockPresenterDto?.id)
        .indexOf(jokeBlockFromForm?.structureBlockPresenterDto?.id);
      this.jokeBlockCreatorList[index] = jokeBlockFromForm;
    });
  }
}
