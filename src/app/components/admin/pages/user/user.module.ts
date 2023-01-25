import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { UserRoutingModule } from './user-routing.module';

// Componentes
import { UserIndexComponent } from './user-index/user-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';


@NgModule({
  declarations: [
    UserIndexComponent,
    UserAddEditComponent,
    UserAddEditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule, 
  ]
})
export class UserModule { }
