import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@components/shared/shared.module';
import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import { CandidatesComponent } from '@pages/candidates/candidates.component';
import { CandidateItemComponent } from '@pages/candidates/candidate-item/candidate-item.component';
import { CandidateRoutingModule } from '@pages/candidates/candidate-routing.module';

import { ActionsBarComponent } from './actions-bar/actions-bar.component';

@NgModule({
  declarations: [ActionsBarComponent, CandidateItemComponent, CandidatesComponent],
  imports: [
    FormsModule,

    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,

    CommonModule,
    AppPipesModule,
    SharedModule,

    CandidateRoutingModule,
  ],
  exports: [ActionsBarComponent, CandidateItemComponent, CandidatesComponent],
})
export class CandidateModule {}
