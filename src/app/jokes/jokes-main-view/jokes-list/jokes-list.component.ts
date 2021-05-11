import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Joke} from '../../models/joke';
import {Router} from '@angular/router';

@Component({
    selector: 'app-jokes-list',
    templateUrl: './jokes-list.component.html',
    styleUrls: ['./jokes-list.component.css']
})
export class JokesListComponent implements OnInit {
    @Input() jokes: Joke[];
    @Output() removedJoke: EventEmitter<number> = new EventEmitter<number>();

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    removeJoke(joke: Joke, event) {
        event.stopPropagation();
        this.removedJoke.emit(joke.id);
    }

    goToJokeEdition(joke: Joke) {
        this.router.navigate(['/jokes', joke.id]);
    }

    getAuthorNameAndSurname(joke: Joke): string {
        if (joke.author === undefined || joke.author === null) {
            return 'any author';
        } else {
            return joke.author.name + ' ' + joke.author.surname;
        }
    }
}
