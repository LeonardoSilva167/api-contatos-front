import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

const routes: Routes = [
  {path: '',component: ContactIndexComponent ,pathMatch: 'full',},
  {path: 'new',component: ContactAddEditComponent,pathMatch: 'full',},
  {path: 'view/:id', component: ContactViewComponent, pathMatch: 'full'},
  {path: 'edit/:id', component: ContactAddEditComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
