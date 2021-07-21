import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faWindowClose, faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {StructureBlock} from '../models/structure-block';

@Component({
  selector: 'app-standard-block-creator',
  templateUrl: './standard-block-creator.component.html',
  styleUrls: ['./standard-block-creator.component.css']
})
export class StandardBlockCreatorComponent implements OnInit {
  @Input() structureBlock: StructureBlock;
  @Output() blockToDelete: EventEmitter<StructureBlock> = new EventEmitter<StructureBlock>();

  faWindowClose = faWindowClose;
  faLongArrowAltDown = faLongArrowAltDown;
  standardBlockForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.standardBlockForm = this.buildStandardBlockForm();
  }

  private buildStandardBlockForm() {
    return this.formBuilder.group({
      name: [this.structureBlock.title, Validators.required],
      description: [this.structureBlock.description, Validators.required]
    });
  }

  saveStandardBlockValue(): StructureBlock {
    this.structureBlock.title = this.standardBlockForm.value.name;
    this.structureBlock.description = this.standardBlockForm.value.description;
    return this.structureBlock;
  }

  deleteRequest() {
    this.blockToDelete.emit(this.structureBlock);
  }
}
