import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Structure} from '../models/structure';
import {StructuresService} from '../structures.service';
import {StructureBlock} from '../../blocks/structure-blocks/models/structure-block';
import {StructureBlockCreatorComponent} from '../../blocks/structure-blocks/structure-block-creator/structure-block-creator.component';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {StructureBlockCreatorDto} from '../../blocks/structure-blocks/models/structureBlockCreatorDto';
import {StructureCreatorDto} from '../models/structureCreatorDto';

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-edition.component.html',
  styleUrls: ['./structure-edition.component.css']
})
export class StructureEditionComponent implements OnInit {
  @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StructureBlockCreatorComponent>;
  structureCreatorDto: StructureCreatorDto;
  structureForm: FormGroup;
  structureBlockCreatorDtoList: StructureBlockCreatorDto[] = [];
  faArrowDown = faArrowDown;

  constructor(private structuresService: StructuresService,
              private blocksService: StructureBlocksService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadStructure();
    this.structureForm = this.buildStructureForm();
  }

  loadStructure() {
    this.structureCreatorDto = this.route.snapshot.data.structure;
    this.loadBlocksOfTheStructure();
  }

  loadBlocksOfTheStructure() {
    this.blocksService.getBlocksOfTheStructure(this.structureCreatorDto?.id).subscribe((blocks) => {
      if (blocks.length === 0) {
        this.structureBlockCreatorDtoList = [
          new StructureBlock(0)
        ];
      } else {
        this.structureBlockCreatorDtoList = blocks;
      }
    });
  }

  buildStructureForm() {
    return this.formBuilder.group({
      id: [this.structureCreatorDto?.id],
      name: [this.structureCreatorDto?.name, Validators.required],
      description: [this.structureCreatorDto?.description, Validators.minLength(3)],
      dateCreated: [this.structureCreatorDto?.dateCreated]
    });
  }

  updateStructure() {
    const updatedStructure = this.structureForm.value;
    this.standardBlockComponents.forEach((child) => {
      const standardBlock = child.saveStandardBlockValue();
      this.structureBlockCreatorDtoList[standardBlock.position] = standardBlock;
    });
    updatedStructure.structureBlockCreatorDtoList = this.structureBlockCreatorDtoList;
    this.structuresService.updateStructure(updatedStructure).subscribe(() => {
      this.router.navigate(['/structures']);
    });
  }

  onBlockDeleteRequest(blockToDelete: StructureBlock) {
    this.structureBlockCreatorDtoList.splice(blockToDelete.position, 1);
    this.structureBlockCreatorDtoList.forEach(block => {
      if (block.position > blockToDelete.position) {
        block.position = block.position - 1;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/structures']);
  }

  addStructureBlockComponent() {
    this.structureBlockCreatorDtoList.push(
      new StructureBlock(this.structureBlockCreatorDtoList.length)
    );
  }
}
