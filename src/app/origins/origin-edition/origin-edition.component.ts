import { Component, OnInit } from '@angular/core';
import {Origin} from '../models/origin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OriginService} from '../origin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-origin-details',
  templateUrl: './origin-edition.component.html',
  styleUrls: ['./origin-edition.component.css']
})
export class OriginEditionComponent implements OnInit {

  origin: Origin;
  originForm: FormGroup;
  isOriginEditionDemanded = false;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadOrigin();
    this.originForm = this.buildOriginForm();
  }

  loadOrigin() {
    this.origin = this.route.snapshot.data.origin;
    console.log(this.origin);
  }

  buildOriginForm(){
    return this.formBuilder.group({
      name: [this.origin.name, Validators.required],
      dateCreated: [this.origin.dateCreated]
    });
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  updateOrigin(){
    this.origin.name = this.originForm.controls['name'].value;
    this.originService.updateOrigin(this.origin).subscribe(() => {
      this.router.navigate(['/origins']);
    });
  }

  onOriginEditionRequest(isOriginEditionDemanded: boolean) {
    this.isOriginEditionDemanded = isOriginEditionDemanded;
  }
}


