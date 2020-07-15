import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import { Ingredients } from 'src/app/shopping-list/shopping-list.component';

export interface Recipes {
  name: string;
  description: string;
  image: string;
  ingredients: Ingredients[];
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

//   showRecipe = {
//     name: '',
//     description: '',
//     image: ''
// };

  recipes: Recipes [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    // this.recipeService.selectRecipe.subscribe((recipe: Recipes) => {
    //   this.showRecipe = recipe;
    // });
  }

}
