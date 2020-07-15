import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


import {RecipeService} from './recipe-book/recipe.service';
import { Recipes } from './recipe-book/recipe-list/recipe-list.component';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor( private http: HttpClient,
               private recipeService: RecipeService) { }

  storeRecipe(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-46d8e.firebaseio.com/recipes.json', recipes).subscribe( responce => {
      console.log(responce);
    });
  }

  fetchRecipe(){
    return this.http
      .get<Recipes[]>('https://recipe-book-46d8e.firebaseio.com/recipes.json')
      .pipe(
      tap( recipes => {
        this.recipeService.setRecipes(recipes);
        console.log(recipes);
      })
      );
  }

}
