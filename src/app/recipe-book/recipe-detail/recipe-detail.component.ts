import { Component, OnInit } from '@angular/core';
import { Recipes } from '../recipe-list/recipe-list.component';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Ingredients } from 'src/app/shopping-list/shopping-list.component';
import { ActivatedRoute, Params } from '@angular/router';
import {RecipeService} from '../recipe.service';
import {DataStorageService} from '../../data-storage.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger('animation', [
      state('start', style({
        border: 'solid grey',
        borderWidth: '0 1px 1px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(-45deg)',
        webkitTransform: 'rotate(-45deg)',
      })),
      state('end', style({
        border: 'solid grey',
        borderWidth: '0 1px 1px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(45deg)',
        webkitTransform: 'rotate(45deg)',
      })),
      transition('start => end', animate(100)),
      transition('end => start', animate(100)),
    ]),


    trigger('notify', [
      state('start', style({
        display: 'block',
        zIndex: '-1',
        borderRadius: '8px',
        backgroundColor: 'black',
        color: 'white',
        opacity: '0%',
        position: 'fixed',
        top: '7%',
        right: '2%',
        padding: '15px'
      })),
      state('end', style({
        display: 'block',
        zIndex: '100',
        borderRadius: '8px',
        backgroundColor: 'black',
        color: 'white',
        opacity: '100%',
        position: 'fixed',
        top: '7%',
        right: '2%',
        padding: '15px'
      })),
      transition('start => end', animate(800)),
      transition('end => start', animate(800)),
    ])


  ]
})
export class RecipeDetailComponent implements OnInit {

  show = false;
  animation = 'start';
  id: number;

  notification = 'start';

  exactRecipe: Recipes;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.exactRecipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  Add() {
      this.shoppingListService.addIngredients( this.exactRecipe.ingredients );
      if (this.notification === 'start') {this.notification = 'end'; }
      setInterval(() => {
        this.notification = 'start'; }, 3000);
    }


  animate() {
    this.show = !this.show;
    if (this.animation === 'start'){
      this.animation = 'end';
    }
    else { this.animation = 'start'; }
  }

  Delete() {
    this.recipeService.delete(this.id);
    this.dataStorageService.storeRecipe();
  }
}
