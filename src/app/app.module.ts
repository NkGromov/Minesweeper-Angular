import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './game/components/cell/cell.component';
import { TableComponent } from './game/components/table/table.component';
import { ButtonComponent } from './shared/button/button.component';
import { ModalComponent } from './shared/modal/modal.component';
import { TemplatesComponent } from './templates/components/templates/templates.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CellComponent,
    ModalComponent,
    ButtonComponent,
    TemplatesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
