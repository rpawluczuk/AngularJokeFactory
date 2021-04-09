import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-structure-creation',
    templateUrl: './structure-creation.component.html',
    styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
    faArrowUp = faArrowUp;
    faArrowRight = faArrowRight;
    faArrowDown = faArrowDown;
    faArrowLeft = faArrowLeft;
    structureForm: FormGroup;
    blocks: string[][];

    constructor(private structuresService: StructuresService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.structureForm = this.buildStructureForm();
        this.blocks = [
            ['Start block']
        ];
    }

    buildStructureForm() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.minLength(3)]
        });
    }

    addStructure() {
        this.structuresService.addStructure(this.structureForm.value).subscribe(() => {
            this.router.navigate(['/structures']);
        });
    }


    up(block: string, y: number, x: number) {
        if (this.blocks[y - 1]) {
            this.blocks[y - 1][x] = 'Up block';
        } else {
            const newRow: string[] = [];
            this.blocks[y].forEach(() => newRow.push('Empty Block'));
            newRow.splice(x, 1, 'Up block');
            this.blocks.splice(y - 1, 0, newRow);
        }
    }

    down(block: string, y: number, x: number) {
        if (this.blocks[y + 1]) {
            this.blocks[y + 1][x] = 'Down block';
        } else {
            const newRow: string[] = [];
            this.blocks[y].forEach(() => newRow.push('Empty Block'));
            newRow.splice(x, 1, 'Down block');
            this.blocks.splice(y + 1, 0, newRow);
        }
    }

    left(block: string, y: number, x: number) {
        if (x > 0) {
            this.blocks[y][x - 1] = 'Left block';
        } else {
            this.blocks.forEach(row => row.splice(0, 0, 'Empty Block'));
            this.blocks[y].splice(0, 1, 'Left block');
        }
    }

    right(block: string, y: number, x: number) {
        if (x + 1 !== this.blocks[y].length) {
            this.blocks[y][x + 1] = 'Right block';
        } else {
            this.blocks.forEach(row => row.push('Empty Block'));
            this.blocks[y].splice(x + 1, 1, 'Right block');
        }
    }
}
