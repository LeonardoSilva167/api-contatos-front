import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

const routes: Routes = [
  {path: '',component: ContactIndexComponent ,pathMatch: 'full',},
  {path: 'novo',component: ContactAddEditComponent,pathMatch: 'full',},
  {path: 'visualizar/:id', component: ContactViewComponent, pathMatch: 'full'},
  {path: 'editar/:id', component: ContactAddEditComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
