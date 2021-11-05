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
    this.loadAuthorPresenterList();
  }

  private loadAuthorPresenterList() {
    this.authorsService.getAuthorPresenterList().subscribe((authorPresenterList) => {
      this.authorPresenterList = authorPresenterList;
    });
  }

  onRemovedAuthor(authorId: number){
    this.authorsService.removeAuthor(authorId).subscribe(() => {
      this.loadAuthorPresenterList();
    });
  }

  goToAuthorDetails(authorPresenter: AuthorPresenterDto) {
    this.router.navigate(['/authors', authorPresenter.id]);
  }
}
