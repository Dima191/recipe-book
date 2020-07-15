import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Recipes } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipes;
  @Input() ind: number;

  constructor( ) { }

  ngOnInit(): void {
  }


}
