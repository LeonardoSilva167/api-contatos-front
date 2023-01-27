import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages Components
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {path: '',component: HomeComponent ,pathMatch: 'full',},
  {path: 'admin/contacts',loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule),},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
