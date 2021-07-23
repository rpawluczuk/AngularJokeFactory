import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Structure} from '../models/structure';
import {StructuresService} from '../structures.service';
import {StructureBlock} from '../../blocks/structure-blocks/models/structure-block';
import {StructureBlockCreatorComponent} from '../../blocks/structure-blocks/structure-block-creator/structure-block-creator.component';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-edition.component.html',
  styleUrls: ['./structure-edition.component.css']
})
export class StructureEditionComponent implements OnInit {
  @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StructureBlockCreatorComponent>;
  structure: Structure;
  structureForm: FormGroup;
  blocksToDelete: StructureBlock[] = [];
  blocksToUpdate: StructureBlock[] = [];
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
    this.structure = this.route.snapshot.data.structure;
    this.loadBlocksOfTheStructure();
  }

  loadBlocksOfTheStructure() {
    this.blocksService.getBlocksOfTheStructure(this.structure?.id).subscribe((blocks) => {
      if (blocks.length === 0) {
        this.blocksToUpdate = [
          new StructureBlock(0)
        ];
      } else {
        this.blocksToUpdate = blocks;
      }
    });
  }

  buildStructureForm() {
    return this.formBuilder.group({
      name: [this.structure.name, Validators.required],
      description: [this.structure.description, Validators.minLength(3)],
      dateCreated: [this.structure.dateCreated]
    });
  }

  updateStructure() {
    this.structure.name = this.structureForm.controls.name.value;
    this.structure.description = this.structureForm.controls.description.value;
    this.structuresService.updateStructure(this.structure).subscribe(() => {
      this.updateBlocks();
      this.deleteBlocks();
    });
  }

  updateBlocks() {
    this.standardBlockComponents.forEach((child) => {
      const standardBlock = child.saveStandardBlockValue();
      this.blocksToUpdate[standardBlock.position] = standardBlock;
    });
    this.blocksToUpdate.forEach(block => block.structure = this.structure);
    this.blocksToUpdate.forEach(blockToUpdate => {
      this.blocksService.updateBlock(blockToUpdate).subscribe(() => {
        this.router.navigate(['/structures']);
      });
    });
  }

  deleteBlocks() {
    this.blocksToDelete.forEach(blockToDelete => {
      this.blocksService.removeBlock(blockToDelete.id).subscribe();
    });
  }

  onBlockDeleteRequest(blockToDelete: StructureBlock) {
    this.blocksToDelete = this.blocksToDelete.concat(
      this.blocksToUpdate.splice(blockToDelete.position - 1, 2));
    this.blocksToUpdate.forEach(block => {
      if (block.position > blockToDelete.position) {
        block.position = block.position - 2;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/structures']);
  }

  addStructureBlockComponent(){
    this.blocksToUpdate.push(
      new StructureBlock(this.blocksToUpdate.length)
    );
  }
}
