import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages Components
import { HomeComponent } from './pages/home/home.component';
import { UserIndexComponent } from './pages/user/user-index/user-index.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent ,
    pathMatch: 'full',
  },
  {
    path: 'admin/pessoas',
    loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
    // pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
