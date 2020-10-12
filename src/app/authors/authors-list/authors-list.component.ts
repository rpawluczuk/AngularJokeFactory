import { Component, OnInit } from '@angular/core';
import {Author} from '../models/author';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorsService} from '../authors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authors: Author[];
  authorForm: FormGroup;
  constructor(private authorsService: AuthorsService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loadAuthors();
    this.authorForm = this.buildAuthorForm();
  }

  private buildAuthorForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      description: ['']
    });
  }

  private loadAuthors() {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  addAuthor(){
    console.log(this.authorForm.value);
    this.authorsService.addAuthor(this.authorForm.value).subscribe(() => {
      this.loadAuthors();
    });
  }

  removeAuthor(author: Author, event){
    event.stopPropagation();
    this.authorsService.removeAuthor(author.id).subscribe(() => {
      this.loadAuthors();
    });
  }

  goToAuthorDetails(author: Author) {
    this.router.navigate(['/authors', author.id]);
  }
}
