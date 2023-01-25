import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserIndexComponent } from './user-index/user-index.component';

const routes: Routes = [
  {
    path: '',
    component: UserIndexComponent ,
    pathMatch: 'full',
  },
  {
    path: 'novo',
    component: UserAddEditComponent,
    pathMatch: 'full',
  },
  {
    path: 'visualizar/:id', 
    component: UserIndexComponent, 
    pathMatch: 'full'
  },
  {
    path: 'editar/:id', 
    component: UserAddEditComponent, 
    pathMatch: 'full'
  },
  {
    path: 'excluir/:id', 
    component: UserIndexComponent, 
    pathMatch: 'full'
  }
];

// path: 'edit/:id/details', 
// <a [routerLink]="['/user/edit', user['id'], 'details']" class="btn btn-success btn-sm">Editar</a>

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
