import {Component, Input, OnInit} from '@angular/core';
import {StandardBlock} from '../../models/standard-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-standard-block',
    templateUrl: './standard-block.component.html',
    styleUrls: ['./standard-block.component.css']
})
export class StandardBlockComponent implements OnInit {
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
