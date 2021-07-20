import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StandardBlock} from '../models/standard-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons/faWindowClose';
import {Block} from '../models/block';
import {BlockFactory} from '../models/block-factory';

@Component({
  selector: 'app-standard-block-creator',
  templateUrl: './standard-block-creator.component.html',
  styleUrls: ['./standard-block-creator.component.css']
})
export class StandardBlockCreatorComponent implements OnInit {
  @Input() standardBlock: StandardBlock;
  // @Input() inputBlocks: Block[];
  @Output() blockToDelete: EventEmitter<Block> = new EventEmitter<Block>();

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

  saveStandardBlockValue(): StandardBlock {
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
