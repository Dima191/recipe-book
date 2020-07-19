// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import {RecipeService} from '../recipe.service';
// import { NgForm, FormGroup, FormControl, FormArray } from '@angular/forms';
// import { Recipes } from '../recipe-list/recipe-list.component';
// import { Ingredients } from 'src/app/shopping-list/shopping-list.component';
// import {DataStorageService} from '../../data-storage.service';
//
// @Component({
//   selector: 'app-recipe-edit',
//   templateUrl: './recipe-edit.component.html',
//   styleUrls: ['./recipe-edit.component.css']
// })
// export class RecipeEditComponent implements OnInit {
//
//
//
//
//   new = false;
//
//   recipeForm: FormGroup;
//
//   id: number;
//   constructor( private route: ActivatedRoute,
//                private router: Router,
//                private recipeService: RecipeService,
//                private dataStorageService: DataStorageService) { }
//
//   ngOnInit(): void {
//   this.route.params.subscribe((params: Params) => {
//       this.id = +params['id'];
//       if (this.id === undefined) {
//         this.new = true;
//       }
//       this.InItForm();
//     });
//   }
//
//   onCancel() {
//     this.router.navigate(['../'], { relativeTo: this.route });
//   }
//
//   onSubmit() {
//     const newRecipe: Recipes = {
//       name: this.recipeForm.value['name'],
//       image: this.recipeForm.value['image'],
//       description: this.recipeForm.value['description'],
//       ingredients: this.recipeForm.value['ingredients']
//     };
//     if (!this.new) {
//       this.recipeService.editRecipe(newRecipe, this.id);
//       this.dataStorageService.storeRecipe();
//     }
//     else {
//       this.recipeService.addRecipe(newRecipe);
//       this.dataStorageService.storeRecipe();
//     }
//     this.onCancel();
//   }
//
//   private InItForm(){
//
//     let recipeName = '';
//     let recipeImg = '';
//     let recipeDesc = '';
//     let recipeIngredients = new FormArray([]);
//     if (!this.new){
//       const recipe = this.recipeService.getRecipe(this.id);
//       if (recipe.ingredients.length === 0 ){
//         for ( let ingredient of recipe.ingredients ){
//            recipeIngredients.push(
//              new FormGroup({
//                name: new FormControl(ingredient.name),
//                amount: new FormControl(ingredient.amount)
//              })
//            );
//         }
//       }
//       recipeName = recipe.name;
//       recipeImg = recipe.image;
//       recipeDesc = recipe.description;
//     }
//     this.recipeForm = new FormGroup({
//       name: new FormControl(recipeName),
//       image: new FormControl(recipeImg),
//       description: new FormControl(recipeDesc),
//       ingredients: recipeIngredients,
//     });
//   }
//
//   addIngredient() {
//     (<FormArray>this.recipeForm.get('ingredients')).push(
//       new FormGroup({
//         name: new FormControl(),
//         amount: new FormControl(),
//         }
//
//       )
//     )
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import {DataStorageService} from '../../data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  [x: string]: any;
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  img: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      this.recipeService.editRecipe( this.recipeForm.value, this.id );
      this.dataStorageService.storeRecipe();
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorageService.storeRecipe();
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.image;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      image: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
