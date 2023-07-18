import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoricoService } from './services/storico/storico.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StoricoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
