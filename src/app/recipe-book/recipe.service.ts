import { Injectable, EventEmitter } from '@angular/core';
import {Recipes} from './recipe-list/recipe-list.component';
import { Ingredients } from '../shopping-list/shopping-list.component';
import {DataStorageService} from '../data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  [x: string]: any;

  // selectRecipe = new EventEmitter<Recipes>();

  recipes: Recipes[] = [];
  // private recipes: Recipes [] = [
  //   {name: 'Tasty Schnitzel',
  //     description: 'A Super-Tasty Schnitzel - Just Awesome!',
  //     image: 'https://www.gastronom.ru/binfiles/images/20190605/b6ccf251.jpg',
  //     ingredients: [{name: 'meat', amount: 1}, {name: 'French Fries', amount: 20}]
  //   },
  //   {name: 'Big Fat Burger',
  //     description: 'What Else You Need To Say?',
  //     image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/e0/56/61/burger-keyfi.jpg',
  //     ingredients: [{name: 'Buns', amount: 2}, {name: 'Meat', amount: 1}]
  //   },
  //   {name: 'Tiramisu',
  //   description: 'Very Tasty Dish',
  //   image: 'https://ist.say7.info/img0005/69/569_0173u3g_3966_6hi.jpg',
  //   ingredients: [{name: 'eggs', amount: 3}, {name: 'sugar', amount: 3}, {name: 'milk', amount: 1}]}
  // ];


  // constructor( private dataStorageService: DataStorageService) { }

  setRecipes( recipes: Recipes[] ){
    if (recipes != null){
      this.recipes = recipes;
    }
  }

  getRecipes(){
    console.log(this.recipes);
    return this.recipes;
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  editRecipe(recipe, id: number){
    this.recipes[id].name = recipe.name;
    this.recipes[id].description = recipe.description;
    this.recipes[id].image = recipe.image;
    this.recipes[id].ingredients = recipe.ingredients;
    // this.dataStorageService.storeRecipe();
  }

  addRecipe(recipe){
    const AddRecipe: Recipes = {name: recipe.name,
      description: recipe.description,
      image: recipe.image,
      ingredients: recipe.ingredients};
    this.recipes.push(AddRecipe);
    console.log('recipe.service add recipe');
    console.log(this.recipes);
    // this.dataStorageService.storeRecipe();
  }


  delete(id){
    this.recipes.splice(id, 1);
    // this.dataStorageService.storeRecipe();
  }

}
