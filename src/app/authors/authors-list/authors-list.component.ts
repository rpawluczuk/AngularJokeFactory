import {Component, OnInit} from '@angular/core';
import {AuthorsService} from '../authors.service';
import {Router} from '@angular/router';
import {AuthorPresenterDto} from '../models/authorPresenterDto';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authorPresenterList: AuthorPresenterDto[];

  constructor(private authorsService: AuthorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  private loadAuthors() {
    this.authorsService.getAuthorPresenterList().subscribe((authorPresenterList) => {
      this.authorPresenterList = authorPresenterList;
    });
  }

  removeAuthor(authorPresenter: AuthorPresenterDto, event){
    event.stopPropagation();
    this.authorsService.removeAuthor(authorPresenter.id).subscribe(() => {
      this.loadAuthors();
    });
  }

  goToAuthorDetails(authorPresenter: AuthorPresenterDto) {
    this.router.navigate(['/authors', authorPresenter.id]);
  }
}
