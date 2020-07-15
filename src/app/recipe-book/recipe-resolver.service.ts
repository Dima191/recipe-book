import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipes } from './recipe-list/recipe-list.component';
import {DataStorageService} from '../data-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import {RecipeService} from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipes[]>{

  constructor( private dataStorageService: DataStorageService,
               private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipes[]> | Promise<Recipes[]> | Recipes[] {
    const recipes = this.recipeService.getRecipes();

    if(recipes.length === 0 ){
      return this.dataStorageService.fetchRecipe();
    }
  }
}
