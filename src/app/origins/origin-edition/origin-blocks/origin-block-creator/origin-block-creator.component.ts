import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Origin} from '../../../models/origin';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OriginService} from '../../../origin.service';

@Component({
  selector: 'app-origin-block-creator',
  templateUrl: './origin-block-creator.component.html',
  styleUrls: ['./origin-block-creator.component.css']
})
export class OriginBlockCreatorComponent implements OnInit {
  @Input() origin: Origin;
  @Output() isOriginEditionDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  originForm: FormGroup;
  faCheck = faCheck;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.originForm = this.buildOriginForm();
  }

  buildOriginForm(){
    return this.formBuilder.group({
      name: [this.origin.name, Validators.required]
    });
  }

  onSave() {
    this.origin.name = this.originForm.controls['name'].value;
    this.originService.updateOrigin(this.origin).subscribe(() => {
      this.isOriginEditionDemanded.emit(false);
    });
  }
}
