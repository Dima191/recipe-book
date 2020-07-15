import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {RecipeService} from '../recipe.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Recipes } from '../recipe-list/recipe-list.component';
import { Ingredients } from 'src/app/shopping-list/shopping-list.component';
import {DataStorageService} from '../../data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipes;

  new = false;

  id: number;
  constructor( private route: ActivatedRoute,
               private recipeService: RecipeService,
               private dataStorageService: DataStorageService) {
    this.id = route.snapshot.params.id;
    if (this.id === undefined) {
      this.new = true;
    }
  }

  ngOnInit(): void {
    if (!this.new) {
      this.recipe = this.recipeService.getRecipe(this.id);
    }
    else {
      this.recipe = {name: '', description: '', image: '', ingredients: []};
    }
  }

  onSubmit(form: NgForm) {
    if (!this.new) {
      this.recipeService.editRecipe(form.value, this.id);
      this.dataStorageService.storeRecipe();
    }
    else {
      this.recipeService.addRecipe(form.value);
      this.dataStorageService.storeRecipe();
    }
  }

}
