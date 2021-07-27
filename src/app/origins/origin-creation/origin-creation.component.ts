import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {OriginService} from '../origin.service';
import {Router} from '@angular/router';
import {Origin} from '../models/origin';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-origin-creation',
  templateUrl: './origin-creation.component.html',
  styleUrls: ['./origin-creation.component.css']
})
export class OriginCreationComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  origins: Origin[] = [];

  originForm: FormGroup;
  connectedOrigins: FormArray;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadOrigins();
    this.originForm = this.buildOriginForm();
  }

  private buildOriginForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      connectedOrigins: this.formBuilder.array([this.createConnectedOrigin()])
    });
  }

  createConnectedOrigin(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe(origins => this.origins = origins);
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  saveOrigin() {
    this.originService.addOrigin(this.originForm.value).subscribe(() => {
      this.router.navigate(['/origins']);
    });
  }

  addConnectedOrigin() {
    this.connectedOrigins = this.originForm.get('connectedOrigins') as FormArray;
    this.connectedOrigins.push(this.createConnectedOrigin());
  }

  removeConnectedOrigin(index: number) {
    this.connectedOrigins.removeAt(index);
  }
}
