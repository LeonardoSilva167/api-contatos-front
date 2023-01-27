import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes Pages
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactViewComponent } from './contact-view/contact-view.component';


@NgModule({
  declarations: [
    ContactAddEditComponent,
    ContactIndexComponent,
    ContactViewComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
