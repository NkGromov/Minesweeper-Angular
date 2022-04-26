import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SapperCellComponent } from './components/sapper-cell/sapper-cell.component';
import { SapperTableComponent } from './components/sapper-table/sapper-table.component';

@NgModule({
  declarations: [AppComponent, SapperTableComponent, SapperCellComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
