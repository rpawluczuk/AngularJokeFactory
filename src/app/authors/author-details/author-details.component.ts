import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorsService} from '../authors.service';
import {AuthorCreatorDto} from '../models/authorCreatorDto';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  authorCreator: AuthorCreatorDto;
  authorForm: FormGroup;

  constructor(private authorsService: AuthorsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadAuthor();
    this.authorForm = this.buildAuthorForm();
  }

  loadAuthor() {
    this.authorCreator = this.route.snapshot.data.author;
  }

  buildAuthorForm(){
    return this.formBuilder.group({
      name: [this.authorCreator.name, Validators.required],
      surname: [this.authorCreator.surname, Validators.required],
      description: [this.authorCreator.description, Validators.minLength(3)],
    });
  }

  updateAuthor(){
    this.authorCreator.name = this.authorForm.controls.name.value;
    this.authorCreator.surname = this.authorForm.controls.surname.value;
    this.authorCreator.description = this.authorForm.controls.description.value;
    this.authorsService.updateAuthor(this.authorCreator).subscribe(() => {
      this.router.navigate(['/authors']);
    });
  }

  onCancel() {
    this.router.navigate(['/authors']);
  }
}
