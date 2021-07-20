import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {Block} from '../../blocks/structure-blocks/models/block';
import {BlockType} from '../../blocks/structure-blocks/models/block-type';
import {StandardBlockCreatorComponent} from '../../blocks/structure-blocks/standard-block-creator/standard-block-creator.component';
import {Structure} from '../models/structure';
import {BlockFactory} from '../../blocks/structure-blocks/models/block-factory';
import {BlocksService} from '../../blocks/structure-blocks/blocks.service';

@Component({
  selector: 'app-structure-creation',
  templateUrl: './structure-creation.component.html',
  styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
  @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StandardBlockCreatorComponent>;
  structureForm: FormGroup;
  blocks: Block[];
  blockType = BlockType;
  private blockFactory = new BlockFactory();

  constructor(private structuresService: StructuresService,
              private blocksService: BlocksService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.structureForm = this.buildStructureForm();
    this.blocks = [
      this.blockFactory.createStandardBlock(0),
      this.blockFactory.createActionBlock(1)
    ];
  }

  buildStructureForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.minLength(3)]
    });
  }

  addStructure() {
    const newStructure: Structure = this.structureForm.value;
    this.structuresService.addStructure(newStructure).subscribe(() => {
      this.addBlocks();
    });
  }

  addBlocks() {
    this.structuresService.getLastStructure().subscribe(structure => {
      this.standardBlockComponents.forEach((child) => {
          const standardBlock = child.saveStandardBlockValue();
          this.blocks[standardBlock.position] = standardBlock;
      });
      this.blocks = this.blocks.filter(block => block.blockType !== BlockType.ACTION_BLOCK);
      this.blocks.forEach(block => block.structure = structure);
      this.blocks.forEach(block => {
        this.blocksService.addBlock(block).subscribe(() => {
          this.router.navigate(['/structures']);
        });
      });
    });
  }
  onBlockDeleteRequest(blockToDelete: Block){
    this.blocks.splice(blockToDelete.position - 1, 2);
    this.blocks.forEach(block => {
      if (block.position > blockToDelete.position) {
        block.position = block.position - 2;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/structures']);
  }

  onChangedBlocks(changedBlocks: Block[]) {
    this.blocks = changedBlocks;
  }
}
