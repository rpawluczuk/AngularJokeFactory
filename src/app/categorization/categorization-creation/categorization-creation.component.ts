import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TopicItemDto} from '../../topics/models/topicItemDto';
import {TopicService} from '../../topics/topic.service';
import {CategorizationService} from '../categorization.service';

@Component({
  selector: 'app-categorization-creation',
  templateUrl: './categorization-creation.component.html',
  styleUrls: ['./categorization-creation.component.css']
})
export class CategorizationCreationComponent implements OnInit {

  topicItemList: TopicItemDto[];
  categorizationForm: FormGroup;

  constructor(private categorizationService: CategorizationService,
              private topicService: TopicService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadTopicItemList();
    this.categorizationForm = this.buildCategorizationForm();
  }

  private buildCategorizationForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      baseCategory: [null],
      questions: [null],
      linkedCategory: [null]
    });
  }

  private loadTopicItemList() {
    this.topicService.getTopicItemList().subscribe((topicItemList) => {
      this.topicItemList = topicItemList;
    });
  }

  addCategorization() {
    this.categorizationService.addCategorization(this.categorizationForm.value).subscribe(() => {
      this.router.navigate(['/categorizations']);
    });
  }

  onCancel() {
    this.router.navigate(['/categorizations']);
  }
}
