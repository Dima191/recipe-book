import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, take, exhaustMap } from 'rxjs/operators';


import {RecipeService} from './recipe-book/recipe.service';
import { Recipes } from './recipe-book/recipe-list/recipe-list.component';
import {AuthService} from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor( private http: HttpClient,
               private recipeService: RecipeService,
               private authService: AuthService) { }

  storeRecipe(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-46d8e.firebaseio.com/recipes.json', recipes).subscribe( responce => {
      console.log(responce);
    });
  }

  fetchRecipe(){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
        .get<Recipes[]>('https://recipe-book-46d8e.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          });
    }),
      tap( recipes => {
          this.recipeService.setRecipes(recipes);
          console.log(recipes);
        })
      );

  }

}
