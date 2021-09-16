import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Origin} from '../../../models/origin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OriginService} from '../../../origin.service';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {OriginCreatorChildDto} from "../../../models/originCreatorChildDto";

@Component({
  selector: 'app-child-origin-block-creator',
  templateUrl: './child-origin-block-creator.component.html',
  styleUrls: ['./child-origin-block-creator.component.css']
})
export class ChildOriginBlockCreatorComponent implements OnInit {
  @Output() isChildOriginCreationDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() parentId: number;

  originCreatorChild: OriginCreatorChildDto;
  origins: Origin[] = [];
  originChildForm: FormGroup;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.originCreatorChild = new OriginCreatorChildDto(this.parentId);
    this.loadOrigins();
    this.originChildForm = this.buildOriginForm();
  }

  buildOriginForm(){
    return this.formBuilder.group({
      name: [this.originCreatorChild.name, Validators.required]
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe(origins => this.origins = origins);
  }

  onSave() {
    this.originCreatorChild.name = this.originChildForm.controls['name'].value;
    this.originService.addOriginChild(this.originCreatorChild).subscribe(() => {
      this.isChildOriginCreationDemanded.emit(false);
    });
  }

  onCancel() {
    this.isChildOriginCreationDemanded.emit(false);
  }
}
