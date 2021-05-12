import {Component, Input, OnInit} from '@angular/core';
import {StandardBlock} from '../../models/standard-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-standard-block-creator',
    templateUrl: './standard-block-creator.component.html',
    styleUrls: ['./standard-block-creator.component.css']
})
export class StandardBlockCreatorComponent implements OnInit {
    @Input() standardBlock: StandardBlock;

    standardBlockForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.standardBlockForm = this.buildStandardBlockForm();
    }

    private buildStandardBlockForm() {
        return this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    saveStandardBlockValue(): StandardBlock {
        this.standardBlock.setTitle(this.standardBlockForm.value.name);
        return this.standardBlock;
    }
}
