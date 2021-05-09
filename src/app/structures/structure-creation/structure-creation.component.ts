import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructuresService} from '../structures.service';
import {Router} from '@angular/router';
import {Block} from '../models/block';
import {BlockType} from '../models/block-type';
import {StandardBlockComponent} from './standard-block/standard-block.component';
import {Structure} from '../models/structure';
import {BlockFactory} from '../models/block-factory';

@Component({
    selector: 'app-structure-creation',
    templateUrl: './structure-creation.component.html',
    styleUrls: ['./structure-creation.component.css']
})
export class StructureCreationComponent implements OnInit {
    @ViewChildren('standardBlockRef') standardBlockComponents: QueryList<StandardBlockComponent>;
    structureForm: FormGroup;
    blocks: Block[];
    blockType = BlockType;
    private blockFactory = new BlockFactory();

    constructor(private structuresService: StructuresService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.structureForm = this.buildStructureForm();
        this.blocks = [
            this.blockFactory.createStandardBlock(0),
            this.blockFactory.createActionBlock(1)
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
            console.log(standardBlock.getPosition());
            this.blocks[standardBlock.getPosition()] = standardBlock;
        });
        const newStructure: Structure = this.structureForm.value;
        newStructure.blockScheme = this.blocks;
        console.log(newStructure);
        this.structuresService.addStructure(newStructure).subscribe(() => {
            this.router.navigate(['/structures']);
        });
    }

    onChangedBlocks(changedBlocks: Block[]) {
        this.blocks = changedBlocks;
    }
}
