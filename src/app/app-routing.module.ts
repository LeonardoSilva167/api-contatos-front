import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/core/pages/common-page/page-not-found/page-not-found.component';
// import { PageNotFoundComponent } from './components/core/pages/common-page/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '',  redirectTo: '/admin', pathMatch: 'full'},// Page raiz da aplicação
  {path: 'admin',loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)}, //Page admin
  { path: 'not-found', component: PageNotFoundComponent },// Página não encontradas
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
