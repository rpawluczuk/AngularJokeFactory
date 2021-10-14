import { Component, OnInit } from '@angular/core';
import {TopicItemDto} from '../../topics/models/topicItemDto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategorizationService} from '../categorization.service';
import {TopicService} from '../../topics/topic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategorizationCreatorDto} from '../models/CategorizationCreatorDto';

@Component({
  selector: 'app-categorization-edition',
  templateUrl: './categorization-edition.component.html',
  styleUrls: ['./categorization-edition.component.css']
})
export class CategorizationEditionComponent implements OnInit {

  categorizationCreator: CategorizationCreatorDto;
  topicItemList: TopicItemDto[];
  categorizationForm: FormGroup;

  constructor(private categorizationService: CategorizationService,
              private topicService: TopicService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loadCategorizationCreator();
    this.loadTopicItemList();
    this.categorizationForm = this.buildCategorizationForm();
  }

  private buildCategorizationForm() {
    return this.formBuilder.group({
      id: [this.categorizationCreator?.id],
      name: [this.categorizationCreator?.name, Validators.required],
      baseCategory: [this.categorizationCreator?.baseCategory],
      questions: [this.categorizationCreator?.questions],
      linkedCategory: [this.categorizationCreator?.linkedCategory]
    });
  }

  private loadTopicItemList() {
    this.topicService.getTopicItemList().subscribe((topicItemList) => {
      this.topicItemList = topicItemList;
    });
  }

  editCategorization() {
    this.categorizationService.editCategorization(this.categorizationForm.value).subscribe(() => {
      this.router.navigate(['/categorizations']);
    });
  }

  private loadCategorizationCreator() {
    this.categorizationCreator = this.route.snapshot.data.categorization;
    console.log(this.route.snapshot.data.categorization);
  }

  onCancel() {
    this.router.navigate(['/categorizations']);
  }
}
