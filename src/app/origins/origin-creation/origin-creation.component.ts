import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OriginService} from '../origin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-origin-creation',
  templateUrl: './origin-creation.component.html',
  styleUrls: ['./origin-creation.component.css']
})
export class OriginCreationComponent implements OnInit {

  originForm: FormGroup;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.originForm = this.buildOriginForm();
  }

  private buildOriginForm() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onCancel() {
    this.router.navigate(['/origins']);
  }

  addOrigin() {
    this.originService.addOrigin(this.originForm.value).subscribe(() => {
      this.router.navigate(['/origins']);
    });
  }
}
