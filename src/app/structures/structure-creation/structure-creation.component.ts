import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {Block} from '../models/block';
import {StandardBlock} from '../models/standard-block';
import {BlockType} from '../models/block-type';
import {ArrowBlock} from '../models/arrow-block';
import {BlankBlock} from '../models/blank-block';
import {DirectionType} from '../models/direction-type';

@Component({
    selector: 'app-structure-creation',
    templateUrl: './structure-creation.component.html',
    styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
    structureForm: FormGroup;
    blocks: Block[][];
    blockType = BlockType;

    constructor(private structuresService: StructuresService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.structureForm = this.buildStructureForm();
        this.blocks = [
            [new BlankBlock(), new BlankBlock(DirectionType.UP), new BlankBlock()],
            [new BlankBlock(DirectionType.LEFT), new StandardBlock('Start Block'), new BlankBlock(DirectionType.RIGHT)],
            [new BlankBlock(), new BlankBlock(DirectionType.DOWN), new BlankBlock()]
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

    castToStandardBlock(block: Block): StandardBlock {
        return block as StandardBlock;
    }

    castToArrowBlock(block: Block): ArrowBlock {
        return block as ArrowBlock;
    }

    castToBlankBlock(block: Block): BlankBlock {
        return block as BlankBlock;
    }
}
