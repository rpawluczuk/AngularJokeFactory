import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Joke} from '../models/joke';
import {Author} from '../../authors/models/author';
import {Structure} from '../../structures/models/structure';
import {JokesService} from '../jokes.service';
import {StructuresService} from '../../structures/structures.service';
import {AuthorsService} from '../../authors/authors.service';
import {Router} from '@angular/router';
import {Origin} from '../../origins/models/origin';
import {OriginService} from '../../origins/origin.service';
import {BlockType} from '../../blocks/models/block-type';
import {BlocksService} from '../../blocks/structure-blocks/blocks.service';
import {Block} from '../../blocks/models/block';
import {BlockFactory} from '../../blocks/models/block-factory';
import {JokeBlockCreatorComponent} from '../../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';

@Component({
  selector: 'app-joke-creation',
  templateUrl: './joke-creation.component.html',
  styleUrls: ['./joke-creation.component.css']
})
export class JokeCreationComponent implements OnInit {
  @ViewChildren('jokeBlockRef') jokeBlockComponents: QueryList<JokeBlockCreatorComponent>;

  jokes: Joke[];
  authors: Author[];
  origins: Origin[];
  allStructures: Structure[] = [];
  jokeForm: FormGroup;
  blockType = BlockType;
  blocks: Block[] = [];
  private blockFactory = new BlockFactory();

  selectedStructuresByDefault = [];
  selectedStructuresByUser: Structure[];
  dropdownSettings = {};

  constructor(private jokesService: JokesService,
              private structuresService: StructuresService,
              private authorsService: AuthorsService,
              private originService: OriginService,
              private blocksService: BlocksService,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadStructures();
    this.loadAuthores();
    this.loadOrigins();
    this.jokeForm = this.buildJokeForm();
    this.selectedStructuresByDefault = [];
    this.selectedStructuresByUser = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  loadStructures(): void {
    this.structuresService.getStructures().subscribe((structures) => {
      this.allStructures = structures;
    });
  }

  loadAuthores(): void {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  loadOrigins(): void {
    this.originService.getOrigins().subscribe((origins) => {
      this.origins = origins;
    });
  }

  onStructureSelect(item: any) {
    const selectedStructure = this.allStructures.find(s => s.id === item.id);
    this.blocks = [];
    this.blocksService.getBlocksOfTheStructure(selectedStructure.id).subscribe(structureBlocks => {
      this.selectedStructuresByUser.push(selectedStructure);
      structureBlocks
        .filter(block => block.blockType !== BlockType.ARROW_BLOCK)
        .forEach(structureBlock => this.blocks.push(this.blockFactory.createJokeBlock(structureBlock)));
    });
  }

  onStructureDeselect(item: any) {
    let deselectedStructure: Structure;
    deselectedStructure = this.allStructures.find(s => s.id === item.id);
    const index = this.selectedStructuresByUser.indexOf(deselectedStructure);
    this.selectedStructuresByUser.splice(index, 1);
  }

  buildJokeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.minLength(3)],
      structures: [null],
      author: [null],
      origin: [null]
    });
  }

  addJoke() {
    const joke: Joke = this.jokeForm.value;
    joke.structures = this.selectedStructuresByUser;
    this.jokesService.addJoke(this.jokeForm.value).subscribe(() => {
      this.addJokeBlocks();
    });
  }

  addJokeBlocks(){
    let i = 0;
    this.jokeBlockComponents.forEach((child) => {
      this.blocks[i] = child.saveJokeBlockValue();
      i++;
    });
    console.log(this.blocks);
    this.router.navigate(['/jokes']);
  }

  onCancel() {
    this.router.navigate(['/jokes']);
  }

  getDropdownList(allStructures: Structure[]): Array<any> {
    const dropdownList = [];
    for (const structure of allStructures) {
      dropdownList.push({id: structure.id, text: structure.name});
    }
    return dropdownList;
  }
}
