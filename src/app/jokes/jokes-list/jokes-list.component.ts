import { Component, OnInit } from '@angular/core';
import { Joke } from '../models/joke';
import {JokesService} from '../jokes.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
  jokes: Joke[];
  jokeForm: FormGroup;
  constructor(private jokesService: JokesService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loadJokes();
    this.jokeForm = this.buildJokeForm();
  }

  buildJokeForm(){
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)]
    });
  }

  loadJokes(): void{
    this.jokesService.getJokes().subscribe((jokes) => {
      this.jokes = jokes;
      });
  }

  addJoke(){
    this.jokesService.addJoke(this.jokeForm.value).subscribe(() => {
      this.loadJokes();
    });
  }

  goToJokeDetails(joke: Joke){
    this.router.navigate(['/jokes', joke.id]);
  }
}
