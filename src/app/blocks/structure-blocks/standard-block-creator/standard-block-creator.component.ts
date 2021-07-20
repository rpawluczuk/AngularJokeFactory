import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StructureStandardBlock} from '../models/structure-standard-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons/faWindowClose';
import {StructureBlock} from '../models/structure-block';
import {BlockFactory} from '../../models/block-factory';

@Component({
  selector: 'app-standard-block-creator',
  templateUrl: './standard-block-creator.component.html',
  styleUrls: ['./standard-block-creator.component.css']
})
export class StandardBlockCreatorComponent implements OnInit {
  @Input() standardBlock: StructureStandardBlock;
  // @Input() inputBlocks: StructureBlock[];
  @Output() blockToDelete: EventEmitter<StructureBlock> = new EventEmitter<StructureBlock>();

  faWindowClose = faWindowClose;
  standardBlockForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.standardBlockForm = this.buildStandardBlockForm();
  }

  private buildStandardBlockForm() {
    return this.formBuilder.group({
      name: [this.standardBlock.title, Validators.required],
      description: [this.standardBlock.description, Validators.required]
    });
  }

  saveStandardBlockValue(): StructureStandardBlock {
    this.standardBlock.title = this.standardBlockForm.value.name;
    this.standardBlock.description = this.standardBlockForm.value.description;
    return this.standardBlock;
  }

  // Myślę, że muszę zmienić logikę tej funkcji tak by emitowała tylko blok któy chcę usunąć
  deleteRequest() {
    // console.log(this.inputBlocks[position]);
    // this.inputBlocks = this.inputBlocks
    //   .filter(block => block.position !== position - 1)
    //   .filter(block => block.position !== position);
    // this.inputBlocks.forEach(block => {
    //   if (block.position > position) {
    //     block.position = block.position - 2;
    //   }
    // });
    // console.log(this.inputBlocks);
    this.blockToDelete.emit(this.standardBlock);
  }
}
