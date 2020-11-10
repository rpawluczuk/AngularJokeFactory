import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-structure-creation',
  templateUrl: './structure-creation.component.html',
  styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {

  structureForm: FormGroup;

  constructor(private structuresService: StructuresService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.structureForm = this.buildStructureForm();
  }

  buildStructureForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.minLength(3)]
    });
  }

  addStructure(){
    this.structuresService.addStructure(this.structureForm.value).subscribe(() => {
      this.router.navigate(['/structures']);
    });
  }
}
