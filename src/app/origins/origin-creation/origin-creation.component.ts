import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {OriginService} from '../origin.service';
import {Router} from '@angular/router';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {OriginCreatorDto} from '../models/originCreatorDto';
import {OriginItemDto} from '../models/originItemDto';

@Component({
  selector: 'app-origin-creation',
  templateUrl: './origin-creation.component.html',
  styleUrls: ['./origin-creation.component.css']
})
export class OriginCreationComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  originItemList: OriginItemDto[] = [];

  originForm: FormGroup;
  children: FormArray;

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
      children: this.formBuilder.array([this.createChild()])
    });
  }

  createChild(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe(origins => this.originItemList = origins);
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  saveOrigin() {
    const originCreator = new OriginCreatorDto();
    originCreator.name = this.originForm.value.name;
    originCreator.children = this.originForm.value.children;
    this.originService.addOrigin(originCreator).subscribe(() => {
      this.router.navigate(['/origins']);
    });
  }

  addChild() {
    this.children = this.originForm.get('children') as FormArray;
    this.children.push(this.createChild());
  }

  removeChild(index: number) {
    this.children.removeAt(index);
  }
}
