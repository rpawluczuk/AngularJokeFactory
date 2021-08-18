import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Origin} from '../../../models/origin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OriginService} from '../../../origin.service';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-child-origin-block-creator',
  templateUrl: './child-origin-block-creator.component.html',
  styleUrls: ['./child-origin-block-creator.component.css']
})
export class ChildOriginBlockCreatorComponent implements OnInit {
  @Output() isChildOriginCreationDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() origin: Origin;

  originChild: Origin = new Origin();
  origins: Origin[] = [];
  originChildForm: FormGroup;
  faCheck = faCheck;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadOrigins();
    this.originChildForm = this.buildOriginForm();
  }

  buildOriginForm(){
    return this.formBuilder.group({
      name: [this.originChild.name, Validators.required]
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe(origins => this.origins = origins);
  }

  onSave() {
    this.originChild.name = this.originChildForm.controls['name'].value;
    this.originChild.parents.push(this.origin);
    this.originService.addOrigin(this.originChild).subscribe(() => {
      this.isChildOriginCreationDemanded.emit(false);
    });
  }
}
