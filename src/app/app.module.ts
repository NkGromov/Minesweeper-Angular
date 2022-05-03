import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SapperCellComponent } from './components/sapper-cell/sapper-cell.component';
import { SapperTableComponent } from './components/sapper-table/sapper-table.component';
import { ButtonComponent } from './shared/button/button.component';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SapperTableComponent,
    SapperCellComponent,
    ModalComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
