import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergePageComponent } from '@pages/merge-page/merge-page.component';

const routes: Routes = [
  {
    path: '',
    component: MergePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MergeRoutingModule {}
