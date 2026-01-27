import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuvidoriaComponent } from './features/ouvidoria/ouvidoria.component';

const routes: Routes = [
  {
    path: 'ouvidoria',
    loadChildren: () =>
      import('./features/ouvidoria/ouvidoria.module').then(m => m.OuvidoriaModule),
  },
  {path: 'real-ovidoria', component: OuvidoriaComponent },
  { path: '', redirectTo: 'real-ovidoria', pathMatch: 'full' },
  { path: '**', redirectTo: 'real-ovidoria' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}