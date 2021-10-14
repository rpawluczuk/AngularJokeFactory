import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorItemDto} from '../../../authors/models/authorItemDto';
import {JokeCreatorDto} from '../../models/jokeCreatorDto';
import {JokesService} from '../../jokes.service';
import {Router} from '@angular/router';
import {AuthorsService} from '../../../authors/authors.service';

@Component({
  selector: 'app-fast-creation',
  templateUrl: './fast-creation.component.html',
  styleUrls: ['./fast-creation.component.css']
})
export class FastCreationComponent implements OnInit {

  jokeForm: FormGroup;
  authorItemList: AuthorItemDto[];

  constructor(private jokesService: JokesService,
              private authorsService: AuthorsService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadAuthors();
    this.jokeForm = this.buildJokeForm();
  }

  loadAuthors(): void {
    this.authorsService.getAuthorItemList().subscribe((authorItemList) => {
      this.authorItemList = authorItemList;
    });
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structureItemList: [null],
      author: [null],
      connectingTopic: [null],
      ostensibleTopic: [null],
      comedyTopic: [null]
    });
  }

  addJoke() {
    const jokeCreator: JokeCreatorDto = this.jokeForm.value;
    this.jokesService.addJoke(jokeCreator).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }
}
