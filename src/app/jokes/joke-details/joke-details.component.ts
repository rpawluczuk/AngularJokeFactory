import {Component, OnInit} from '@angular/core';
import {JokesService} from '../jokes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Joke} from '../models/joke';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-details.component.html',
  styleUrls: ['./joke-details.component.css']
})
export class JokeDetailsComponent implements OnInit {
  joke: Joke;
  jokeForm: FormGroup;

  constructor(private jokesService: JokesService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadJoke();
    this.jokeForm = this.buildJokeForm();
  }

  loadJoke() {
    this.joke = this.route.snapshot.data.joke;
  }

  buildJokeForm(){
    return this.formBuilder.group({
      title: [this.joke.title, Validators.required],
      content: [this.joke.content, Validators.minLength(3)],
      dateCreated: [this.joke.dateCreated]
    });
  }

  updateJoke(){
    this.jokesService.updateJoke(this.joke.id, this.jokeForm.value).subscribe(() => {
      this.router.navigate(['/jokes']);
    });
  }
}
