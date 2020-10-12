import {Component, OnInit} from '@angular/core';
import {JokesService} from '../jokes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Joke} from '../models/joke';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Structure} from '../../structures/models/Structure';
import {StructuresService} from '../../structures/structures.service';
import {Author} from '../../authors/models/author';
import {AuthorsService} from '../../authors/authors.service';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-details.component.html',
  styleUrls: ['./joke-details.component.css']
})
export class JokeDetailsComponent implements OnInit {
  joke: Joke;
  jokeForm: FormGroup;
  structures: Structure[];
  authors: Author[];

  constructor(private jokesService: JokesService,
              private formBuilder: FormBuilder,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadJoke();
    this.loadStructures();
    this.loadAuthors();
    this.jokeForm = this.buildJokeForm();
  }

  loadJoke() {
    this.joke = this.route.snapshot.data.joke;
  }

  buildJokeForm(){
    return this.formBuilder.group({
      title: [this.joke.title, Validators.required],
      content: [this.joke.content, Validators.minLength(3)],
      structure: [this.joke.structure],
      author: [this.joke.author],
      dateCreated: [this.joke.dateCreated]
    });
  }

  updateJoke(){
    console.log(this.joke.id);
    this.jokesService.updateJoke(this.joke.id, this.jokeForm.value).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
  }

  loadStructures(): void {
    this.structuresService.getStructures().subscribe((structures) => {
      this.structures = structures;
    });
  }

  loadAuthors(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }
}
