import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDetailComponent } from '@pages/candidate-detail/candidate-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateDetailRoutingModule {}
