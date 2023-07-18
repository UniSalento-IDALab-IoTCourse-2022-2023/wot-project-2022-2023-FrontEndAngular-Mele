import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListItemComponent } from './components/list-item/list-item.component';

const routes: Routes = [
  { path: 'home', component: ListItemComponent },
  { path: '', component: ListItemComponent },
  { path: 'run/:id', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
