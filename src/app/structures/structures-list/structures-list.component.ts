import { Component, OnInit } from '@angular/core';
import {Joke} from '../../jokes/models/joke';
import {Structure} from '../models/Structure';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JokesService} from '../../jokes/jokes.service';
import {Router} from '@angular/router';
import {StructuresService} from '../structures.service';

@Component({
  selector: 'app-structures-list',
  templateUrl: './structures-list.component.html',
  styleUrls: ['./structures-list.component.css']
})
export class StructuresListComponent implements OnInit {
  structures: Structure[];
  structureForm: FormGroup;
  constructor(private structuresService: StructuresService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loadStructures();
    this.structureForm = this.buildStructureForm();
  }

  buildStructureForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.minLength(3)]
    });
  }

  loadStructures(): void{
    this.structuresService.getStructures().subscribe((structures) => {
      this.structures = structures;
    });
  }

  addStructure(){
    this.structuresService.addStructure(this.structureForm.value).subscribe(() => {
      this.loadStructures();
    });
  }

  removeStructure(structure: Structure, event){
    event.stopPropagation();
    this.structuresService.removeStructure(structure.id).subscribe(() => {
      this.loadStructures();
    });
  }

  goToStructureDetails(structure: Structure){
    this.router.navigate(['/structures', structure.id]);
  }
}
