import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Structure} from '../models/structure';
import {StructuresService} from '../structures.service';
import {Block} from '../models/block';
import {BlockType} from '../models/block-type';
import {StandardBlockCreatorComponent} from '../blocks/standard-block-creator/standard-block-creator.component';
import {BlockFactory} from '../models/block-factory';
import {BlocksService} from '../blocks/blocks.service';

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-edition.component.html',
  styleUrls: ['./structure-edition.component.css']
})
export class StructureEditionComponent implements OnInit {
  @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StandardBlockCreatorComponent>;
  structure: Structure;
  structureForm: FormGroup;
  blocksToDelete: Block[] = [];
  blocksToUpdate: Block[] = [];
  blockType = BlockType;
  private blockFactory = new BlockFactory();

  constructor(private structuresService: StructuresService,
              private blocksService: BlocksService,
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
          this.blockFactory.createStandardBlock(0),
          this.blockFactory.createActionBlock(1)
        ];
      } else {
        this.blocksToUpdate = blocks;
        this.blocksToUpdate.push(this.blockFactory.createActionBlock(this.blocksToUpdate.length));
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
    this.blocksToUpdate = this.blocksToUpdate.filter(block => block.blockType !== BlockType.ACTION_BLOCK);
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

  onBlockDeleteRequest(blockToDelete: Block) {
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

  onChangedBlocks(changedBlocks: Block[]) {
    this.blocksToUpdate = changedBlocks;
  }
}
