import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Structure} from '../models/Structure';
import {StructuresService} from '../structures.service';

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.css']
})
export class StructureDetailsComponent implements OnInit {

  structure: Structure;
  structureForm: FormGroup;

  constructor(private structuresService: StructuresService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadStructure();
    this.structureForm = this.buildStructureForm();
  }

  loadStructure() {
    this.structure = this.route.snapshot.data.structure;
  }

  buildStructureForm(){
    return this.formBuilder.group({
      name: [this.structure.name, Validators.required],
      description: [this.structure.description, Validators.minLength(3)],
      dateCreated: [this.structure.dateCreated]
    });
  }

  updateStructure(){
    this.structuresService.updateStructure(this.structure.id, this.structureForm.value).subscribe(() => {
      this.router.navigate(['/structures']);
    });
  }
}
