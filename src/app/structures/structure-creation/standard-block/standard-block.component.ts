import {Component, Input, OnInit} from '@angular/core';
import {StandardBlock} from '../../models/standard-block';

@Component({
    selector: 'app-standard-block',
    templateUrl: './standard-block.component.html',
    styleUrls: ['./standard-block.component.css']
})
export class StandardBlockComponent implements OnInit {
    @Input() standardBlock: StandardBlock;

    constructor() {
    }

    ngOnInit(): void {
    }
}
