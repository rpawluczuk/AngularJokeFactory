import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OriginService} from '../../../origin.service';
import {OriginCreatorDto} from '../../../models/originCreatorDto';

@Component({
  selector: 'app-origin-block-creator',
  templateUrl: './origin-block-creator.component.html',
  styleUrls: ['./origin-block-creator.component.css']
})
export class OriginBlockCreatorComponent implements OnInit {
  @Input() originCreator: OriginCreatorDto;
  @Output() isOriginEditionDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  originForm: FormGroup;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.originForm = this.buildOriginForm();
  }

  buildOriginForm(){
    return this.formBuilder.group({
      name: [this.originCreator.name, Validators.required]
    });
  }

  onSave() {
    this.originCreator.name = this.originForm.controls['name'].value;
    this.originService.updateOrigin(this.originCreator).subscribe(() => {
      this.isOriginEditionDemanded.emit(false);
    });
  }

  onCancel() {
    this.isOriginEditionDemanded.emit(false);
  }
}
