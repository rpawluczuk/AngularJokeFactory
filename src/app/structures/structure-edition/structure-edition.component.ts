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
  blocks: Block[];
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
    this.loadBlocks();
    this.structureForm = this.buildStructureForm();
  }

  loadStructure() {
    this.structure = this.route.snapshot.data.structure;
  }

  loadBlocks() {
    this.blocks = this.structure.blockScheme;
    if (this.blocks.length === 0) {
      this.blocks = [
        this.blockFactory.createStandardBlock(0),
        this.blockFactory.createActionBlock(1)
      ];
    } else {
      this.blocks.push(this.blockFactory.createActionBlock(this.blocks.length));
    }
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
    this.structure.blockScheme = null;
    this.structuresService.updateStructure(this.structure).subscribe(() => {
      this.updateBlocks();
      // this.router.navigate(['/structures']);
    });
  }

  updateBlocks() {
    this.standardBlockComponents.forEach((child) => {
      const standardBlock = child.saveStandardBlockValue();
      this.blocks[standardBlock.position] = standardBlock;
    });
    this.blocks = this.blocks.filter(block => block.blockType !== BlockType.ACTION_BLOCK);
    this.blocks.forEach(block => block.structure = this.structure);
    this.blocks.forEach(block => {
      this.blocksService.updateBlock(block).subscribe(() => {
        this.router.navigate(['/structures']);
      });
    });
  }

  onChangedBlocks(changedBlocks: Block[]) {
    this.blocks = changedBlocks;
  }
}
