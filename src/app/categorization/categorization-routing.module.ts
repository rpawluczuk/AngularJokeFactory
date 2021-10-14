import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategorizationEditionComponent} from './categorization-edition/categorization-edition.component';
import {CategorizationResolveService} from './categorization-resolve.service';


const routes: Routes = [
  {
    path: 'categorizations/:id',
    component: CategorizationEditionComponent,
    resolve: {categorization: CategorizationResolveService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorizationRoutingModule {
}
