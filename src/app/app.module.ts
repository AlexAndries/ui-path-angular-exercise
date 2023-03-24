import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent, DashboardModule } from './dashboard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'grid',
    loadChildren: () => import('./grid-showcase').then(m => m.GridShowcaseModule),
  },
  {
    path: 'progress',
    loadChildren: () => import('./progress-showcase').then(m => m.ProgressShowcaseModule),
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    DashboardModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
