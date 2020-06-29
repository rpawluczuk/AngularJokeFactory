import { Component, OnInit } from '@angular/core';
import { Joke } from '../models/joke';
import {JokesService} from '../jokes.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../../structures/structures.service';
import {Structure} from '../../structures/models/Structure';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
  jokes: Joke[];
  structures: Structure[];
  jokeForm: FormGroup;
  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient
              ) { }

  ngOnInit(): void {
    this.loadJokes();
    this.loadStructures();
    this.jokeForm = this.buildJokeForm();
  }

  buildJokeForm(){
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)]
    });
  }

  loadJokes(): void{
    this.jokesService.getJokes().subscribe((jokes: any) => {
      const structures = jokes.map(joke => {
        return joke._links.structure.href;
      });

      forkJoin([
        ...structures.map(link => {
          return this.http.get(link);
        })
      ]).subscribe(strs => {
        console.log('strs', strs);
        let count = 0;
        this.jokes = jokes.map(joke => {
          return { ...joke, structure: strs[count++]};
        });
        console.log('jokes', this.jokes);
      });

      console.log(structures);
      this.jokes = jokes;
      });
  }

  addJoke(){
    this.jokesService.addJoke(this.jokeForm.value).subscribe(() => {
      this.loadJokes();
    });
  }

  removeJoke(joke: Joke, event){
    event.stopPropagation();
    this.jokesService.removeJoke(joke.id).subscribe(() => {
      this.loadJokes();
    });
  }

  goToJokeDetails(joke: Joke){
    this.router.navigate(['/jokes', joke.id]);
  }

  loadStructures(): void {
    this.structuresService.getStructures().subscribe((structures) => {
      this.structures = structures;
    });
  }
}
