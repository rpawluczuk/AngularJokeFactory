import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  subOrigins: Origin[] = [];
  originForm: FormGroup;

  constructor(private originService: OriginService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subOrigins.push(new Origin());
    this.loadOrigins();
    this.originForm = this.buildOriginForm();
  }

  private buildOriginForm() {
    return this.formBuilder.group({
      name: ['', Validators.required]
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

  addSubOrigin(){
    this.subOrigins.push(new Origin());
  }

  removeSubOrigin(index: number){
    this.subOrigins.splice(index, 1);
  }
}
