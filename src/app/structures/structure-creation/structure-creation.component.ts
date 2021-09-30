import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {StructureBlock} from '../../blocks/structure-blocks/models/structure-block';
import {StructureBlockCreatorComponent} from '../../blocks/structure-blocks/structure-block-creator/structure-block-creator.component';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {StructureBlockCreatorDto} from '../../blocks/structure-blocks/models/structureBlockCreatorDto';
import {StructureCreatorDto} from '../models/structureCreatorDto';

@Component({
  selector: 'app-structure-creation',
  templateUrl: './structure-creation.component.html',
  styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
  @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StructureBlockCreatorComponent>;
  structureForm: FormGroup;
  structureBlockCreatorDtoList: StructureBlockCreatorDto[];
  faArrowDown = faArrowDown;

  constructor(private structuresService: StructuresService,
              private blocksService: StructureBlocksService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.structureForm = this.buildStructureForm();
    this.structureBlockCreatorDtoList = [
      new StructureBlockCreatorDto(0)
    ];
  }

  buildStructureForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.minLength(3)]
    });
  }

  addStructure() {
    const structureCreatorDto: StructureCreatorDto = this.structureForm.value;
    this.standardBlockComponents.forEach((child) => {
      const standardBlock = child.saveStandardBlockValue();
      this.structureBlockCreatorDtoList[standardBlock.position] = standardBlock;
    });
    structureCreatorDto.structureBlockCreatorDtoList = this.structureBlockCreatorDtoList;
    this.structuresService.addStructure(structureCreatorDto).subscribe(() => {
      this.router.navigate(['/structures']);
    });
  }

  onBlockDeleteRequest(blockToDelete: StructureBlockCreatorDto) {
    this.structureBlockCreatorDtoList.splice(blockToDelete.position - 1, 2);
    this.structureBlockCreatorDtoList.forEach(block => {
      if (block.position > blockToDelete.position) {
        block.position = block.position - 2;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/structures']);
  }

  addStructureBlockComponent() {
    this.structureBlockCreatorDtoList.push(new StructureBlock(this.structureBlockCreatorDtoList.length));
  }
}
