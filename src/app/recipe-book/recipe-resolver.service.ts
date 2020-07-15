// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Recipes } from './recipe-list/recipe-list.component';
// import {DataStorageService} from '../data-storage.service';
// import { Observable } from 'rxjs/internal/Observable';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class RecipeResolverService implements Resolve<Recipes[]>{
//
//   constructor( private dataStorageService: DataStorageService ) { }
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipes[]> | Promise<Recipes[]> | Recipes[] {
//       return this.dataStorageService.fetchRecipe();
//   }
// }
