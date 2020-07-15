import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipe.service';
import { Recipes } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: []
})
export class RecipeBookComponent implements OnInit {

  constructor( private recipeService: RecipeService) { }

  ngOnInit(): void {

  }

}
