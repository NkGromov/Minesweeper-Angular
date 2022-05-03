import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './game/components/table/table.component';
import { TemplatesComponent } from './templates/components/templates/templates.component';

const routes: Routes = [
  { path: 'game', component: TableComponent },
  { path: '', component: TemplatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
