import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {Block} from '../models/block';
import {BlockType} from '../models/blockType';

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
    blockType = BlockType;

    structureForm: FormGroup;
    blocks: Block[][];

    constructor(private structuresService: StructuresService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.structureForm = this.buildStructureForm();
        this.blocks = [
            [new Block('Start Block', BlockType.STANDARD)]
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


    up(y: number, x: number) {
        if (this.blocks[y - 1]) {
            this.blocks[y - 1][x] = new Block('Up Block', BlockType.STANDARD);
        } else {
            const newRow: Block[] = [];
            this.blocks[y].forEach(() => newRow.push(new Block('Blank Block', BlockType.BLANK)));
            newRow.splice(x, 1, new Block('Up Block', BlockType.STANDARD));
            this.blocks.splice(0, 0, newRow);
        }
    }

    down(y: number, x: number) {
        if (this.blocks[y + 1]) {
            this.blocks[y + 1][x] = new Block('Down Block', BlockType.STANDARD);
        } else {
            const newRow: Block[] = [];
            this.blocks[y].forEach(() => newRow.push(new Block('Blank Block', BlockType.BLANK)));
            newRow.splice(x, 1, new Block('Down Block', BlockType.STANDARD));
            this.blocks.splice(y + 1, 0, newRow);
        }
    }

    left(y: number, x: number) {
        if (x > 0) {
            this.blocks[y][x - 1] = new Block('Left Block', BlockType.STANDARD);
        } else {
            this.blocks.forEach(row => row.splice(0, 0, new Block('Blank Block', BlockType.BLANK)));
            this.blocks[y].splice(0, 1, new Block('Left Block', BlockType.STANDARD));
        }
    }

    right(y: number, x: number) {
        if (x + 1 !== this.blocks[y].length) {
            this.blocks[y][x + 1] = new Block('Right Block', BlockType.STANDARD);
        } else {
            this.blocks.forEach(row => row.push(new Block('Blank Block', BlockType.BLANK)));
            this.blocks[y].splice(x + 1, 1, new Block('Right Block', BlockType.STANDARD));
        }
    }
}
