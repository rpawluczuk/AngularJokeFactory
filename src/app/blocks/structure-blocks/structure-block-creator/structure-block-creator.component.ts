import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faLongArrowAltDown, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {StructureBlockCreatorDto} from '../models/structureBlockCreatorDto';

@Component({
  selector: 'app-standard-block-creator',
  templateUrl: './structure-block-creator.component.html',
  styleUrls: ['./structure-block-creator.component.css']
})
export class StructureBlockCreatorComponent implements OnInit {
  @Input() structureBlockCreator: StructureBlockCreatorDto;
  @Output() blockToDelete: EventEmitter<StructureBlockCreatorDto> = new EventEmitter<StructureBlockCreatorDto>();

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
      name: [this.structureBlockCreator.title, Validators.required],
      description: [this.structureBlockCreator.description, Validators.required]
    });
  }

  saveStandardBlockValue(): StructureBlockCreatorDto {
    this.structureBlockCreator.title = this.standardBlockForm.value.name;
    this.structureBlockCreator.description = this.standardBlockForm.value.description;
    return this.structureBlockCreator;
  }

  deleteRequest() {
    this.blockToDelete.emit(this.structureBlockCreator);
  }
}
