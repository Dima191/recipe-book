import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ShoppingListService} from '../shopping-list.service';
import { Ingredients } from '../shopping-list.component';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() agreement = new EventEmitter<boolean>();
  allowDelete = false;
  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }


  onAdd(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredients[] = [{name: value.name, amount: value.number}];
    this.shoppingListService.addIngredients( newIngredient );
    form.reset();
  }

  onClear() {
    this.shoppingListService.deleteAll();
  }

  onDelete() {
    this.allowDelete = !this.allowDelete;
    this.agreement.emit(this.allowDelete);
  }
}
