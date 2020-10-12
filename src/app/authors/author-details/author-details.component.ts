import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Author} from '../models/author';
import {AuthorsService} from '../authors.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  author: Author;
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
    this.author = this.route.snapshot.data.author;
    console.log(this.author);
  }

  buildAuthorForm(){
    return this.formBuilder.group({
      name: [this.author.name, Validators.required],
      surname: [this.author.surname, Validators.required],
      description: [this.author.description, Validators.minLength(3)],
      dateCreated: [this.author.dateCreated]
    });
  }

  updateAuthor(){
    this.author.name = this.authorForm.controls['name'].value;
    this.author.surname = this.authorForm.controls['surname'].value;
    this.author.description = this.authorForm.controls['description'].value;
    this.authorsService.updateAuthor(this.author).subscribe(() => {
      this.router.navigate(['/authors']);
    });
  }
}
