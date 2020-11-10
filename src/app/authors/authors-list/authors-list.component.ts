import { Component, OnInit } from '@angular/core';
import {Author} from '../models/author';
import {AuthorsService} from '../authors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authors: Author[];

  constructor(private authorsService: AuthorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  private loadAuthors() {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
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
