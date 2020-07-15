import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {state, style, transition, trigger, animate} from '@angular/animations';

export interface Ingredients {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
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
    ])
  ]
})
export class ShoppingListComponent implements OnInit {

  deleteAllow = false;
  ingredients: Ingredients[] ;
  animation = 'start';

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  deleteIngredient(IDDelete) {
   this.shoppingListService.deleteEl(IDDelete);
  }

  onDelete(event) {
    this.deleteAllow = event;
  }
}
