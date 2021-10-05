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
  structureCreator: StructureCreatorDto;
  structureForm: FormGroup;
  structureBlockCreatorList: StructureBlockCreatorDto[] = [];
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
    this.structureCreator = this.route.snapshot.data.structure;
    this.loadBlocksOfTheStructure();
  }

  loadBlocksOfTheStructure() {
    this.blocksService.getBlocksOfTheStructure(this.structureCreator?.id).subscribe((blocks) => {
      if (blocks.length === 0) {
        this.structureBlockCreatorList = [
          new StructureBlock(0)
        ];
      } else {
        this.structureBlockCreatorList = blocks;
      }
    });
  }

  buildStructureForm() {
    return this.formBuilder.group({
      id: [this.structureCreator?.id],
      name: [this.structureCreator?.name, Validators.required],
      description: [this.structureCreator?.description, Validators.minLength(3)],
      dateCreated: [this.structureCreator?.dateCreated]
    });
  }

  updateStructure() {
    const updatedStructure = this.structureForm.value;
    this.standardBlockComponents.forEach((child) => {
      const standardBlock = child.saveStandardBlockValue();
      this.structureBlockCreatorList[standardBlock.position] = standardBlock;
    });
    updatedStructure.structureBlockCreatorDtoList = this.structureBlockCreatorList;
    this.structuresService.updateStructure(updatedStructure).subscribe(() => {
      this.router.navigate(['/structures']);
    });
  }

  onBlockDeleteRequest(blockToDelete: StructureBlock) {
    this.structureBlockCreatorList.splice(blockToDelete.position, 1);
    this.structureBlockCreatorList.forEach(block => {
      if (block.position > blockToDelete.position) {
        block.position = block.position - 1;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/structures']);
  }

  addStructureBlockComponent() {
    this.structureBlockCreatorList.push(
      new StructureBlock(this.structureBlockCreatorList.length)
    );
  }
}
