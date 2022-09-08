import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CandidateUpdatesComponent } from '@pages/candidate-detail/candidate-updates/candidate-updates.component';
import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import { EditCandidateModalComponent } from '@pages/candidate-detail/edit-candidate-modal/edit-candidate-modal.component';
import { CandidateFormComponent } from '@pages/candidate-detail/candidate-form/candidate-form.component';
import { CandidateDetailRoutingModule } from '@pages/candidate-detail/candidate-detail-routing.module';
import { CandidateCommunicationsComponent } from './candidate-communications/candidate-communications.component';
import { CandidateDetailComponent } from './candidate-detail.component';
import { CandidateMainInfoComponent } from './candidate-main-info/candidate-main-info.component';
import { CandidateActionComponent } from './candidate-action/candidate-action.component';
import { AddCommentModalComponent } from './add-comment-modal/add-comment-modal.component';
import { CommunicationCommentComponent } from './candidate-communications/communication-comment/communication-comment.component';

@NgModule({
  declarations: [
    CandidateDetailComponent,
    CandidateCommunicationsComponent,
    CandidateUpdatesComponent,
    CandidateMainInfoComponent,
    CandidateActionComponent,
    AddCommentModalComponent,
    CommunicationCommentComponent,
    EditCandidateModalComponent,
    CandidateFormComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    AppPipesModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    CandidateDetailRoutingModule,
  ],
  exports: [
    CandidateCommunicationsComponent,
    CandidateDetailComponent,
    CandidateUpdatesComponent,
    CandidateMainInfoComponent,
    CandidateActionComponent,
    AddCommentModalComponent,
    EditCandidateModalComponent,
    CandidateFormComponent,
  ],
})
export class CandidateDetailModule {}
