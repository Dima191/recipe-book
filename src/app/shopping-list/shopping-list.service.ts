import { Injectable } from '@angular/core';
import {Ingredients} from './shopping-list.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredients[] = [
    {name: 'Tomatoes', amount: 10},
    {name: 'Apples', amount: 5}
  ];

  getIngredients(){
    return this.ingredients;
  }
  constructor() { }

  addIngredients(ingredients: Ingredients[]){
    this.ingredients.push(...ingredients);
  }

  deleteAll(){
    this.ingredients.length = 0;
  }


  deleteEl(id: number){
    this.ingredients.splice(id, 1);
  }

}
