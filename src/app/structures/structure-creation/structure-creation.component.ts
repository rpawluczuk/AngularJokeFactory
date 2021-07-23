import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {StructureBlock} from '../../blocks/structure-blocks/models/structure-block';
import {StructureBlockCreatorComponent} from '../../blocks/structure-blocks/structure-block-creator/structure-block-creator.component';
import {Structure} from '../models/structure';
import {StructureBlocksService} from '../../blocks/structure-blocks/structure-blocks.service';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-structure-creation',
  templateUrl: './structure-creation.component.html',
  styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
  @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StructureBlockCreatorComponent>;
  structureForm: FormGroup;
  structureBlocks: StructureBlock[];
  faArrowDown = faArrowDown;

  constructor(private structuresService: StructuresService,
              private blocksService: StructureBlocksService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.structureForm = this.buildStructureForm();
    this.structureBlocks = [
      new StructureBlock(0)
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
          this.structureBlocks[standardBlock.position] = standardBlock;
      });
      this.structureBlocks.forEach(block => block.structure = structure);
      this.structureBlocks.forEach(block => {
        this.blocksService.addBlock(block).subscribe(() => {
          this.router.navigate(['/structures']);
        });
      });
    });
  }
  onBlockDeleteRequest(blockToDelete: StructureBlock){
    this.structureBlocks.splice(blockToDelete.position - 1, 2);
    this.structureBlocks.forEach(block => {
      if (block.position > blockToDelete.position) {
        block.position = block.position - 2;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/structures']);
  }

  addStructureBlockComponent(){
    this.structureBlocks.push(new StructureBlock(this.structureBlocks.length));
  }
}
