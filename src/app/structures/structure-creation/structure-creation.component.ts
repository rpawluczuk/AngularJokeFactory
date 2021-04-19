import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {
    faLongArrowAltDown,
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faLongArrowAltUp
} from '@fortawesome/free-solid-svg-icons';
import {Block} from '../models/block';
import {BlockType} from '../models/blockType';

@Component({
    selector: 'app-structure-creation',
    templateUrl: './structure-creation.component.html',
    styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
    faLongArrowAltUp = faLongArrowAltUp;
    faLongArrowAltRight = faLongArrowAltRight;
    faLongArrowAltDown = faLongArrowAltDown;
    faLongArrowAltLeft = faLongArrowAltLeft;
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

    onChangedBlocks(changedBlocks: Block[][]) {
        this.blocks = changedBlocks;
    }
}
