import { Component, OnInit , Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import {DataStorageService} from '../data-storage.service';
import {RecipeService} from '../recipe-book/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
export class HeaderComponent implements OnInit {


  @ViewChild("menu", {static: false})
  header: ElementRef;

  showMenu = false;

  manage = false;
  animation = 'start';

  constructor(
    private dataStorageService: DataStorageService,
               private recipeService: RecipeService) { }

  ngOnInit(): void {

  }

  animate() {
    this.manage = !this.manage;
    if (this.animation === 'start'){
      this.animation = 'end';
    }
    else { this.animation = 'start'; }
  }

  // onSave() {
  //   this.dataStorageService.storeRecipe();
  // }
  //
  // onFetch() {
  //   this.dataStorageService.fetchRecipe();
  // }
  show() {
    this.showMenu = !this.showMenu;
    if (this.showMenu){
      this.header.nativeElement.style.width = '60vw';
      this.header.nativeElement.style.height = '100vh';
    }
    else {
      this.header.nativeElement.style.width = '100vw';
      this.header.nativeElement.style.height = '';
    }
  }

  closeMenu() {
    this.showMenu = false;
    this.header.nativeElement.style.width = '100vw';
    this.header.nativeElement.style.height = '';
  }
}
