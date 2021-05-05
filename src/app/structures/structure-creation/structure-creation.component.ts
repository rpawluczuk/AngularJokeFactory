import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {Block} from '../models/block';
import {StandardBlock} from '../models/standard-block';
import {BlockType} from '../models/block-type';
import {ArrowBlock} from '../models/arrow-block';
import {BlankBlock} from '../models/blank-block';
import {DirectionType} from '../models/direction-type';
import {StandardBlockComponent} from './standard-block/standard-block.component';
import {Structure} from '../models/structure';

@Component({
    selector: 'app-structure-creation',
    templateUrl: './structure-creation.component.html',
    styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
    @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StandardBlockComponent>;
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
        this.standardBlockComponents.forEach((child) => {
            const standardBlock = child.saveStandardBlockValue();
            console.log(this.blocks);
            console.log(standardBlock.getXPosition());
            this.blocks[standardBlock.getXPosition()][standardBlock.getYPosition()] = standardBlock;
        });
        const newStructure: Structure = this.structureForm.value;
        newStructure.blockScheme = this.blocks;
        console.log(newStructure);
        this.structuresService.addStructure(newStructure).subscribe(() => {
            this.router.navigate(['/structures']);
        });
    }

    onChangedBlocks(changedBlocks: Block[][]) {
        this.blocks = changedBlocks;
    }

    castToStandardBlock(block: Block, x: number, y: number): StandardBlock {
        const standardBlock = block as StandardBlock;
        standardBlock.setXPosition(x);
        standardBlock.setYPosition(y);
        return standardBlock;
    }

    castToArrowBlock(block: Block): ArrowBlock {
        return block as ArrowBlock;
    }

    castToBlankBlock(block: Block): BlankBlock {
        return block as BlankBlock;
    }
}
