import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorsService} from '../authors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-creation',
  templateUrl: './author-creation.component.html',
  styleUrls: ['./author-creation.component.css']
})
export class AuthorCreationComponent implements OnInit {

  authorForm: FormGroup;

  constructor(private authorsService: AuthorsService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.authorForm = this.buildAuthorForm();
  }

  private buildAuthorForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      description: ['']
    });
  }

  addAuthor(){
    console.log(this.authorForm.value);
    this.authorsService.addAuthor(this.authorForm.value).subscribe(() => {
      this.router.navigate(['/authors']);
    });
  }
}
