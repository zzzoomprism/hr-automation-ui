import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CommonModule } from '@angular/common';
import { ErrorDisplayComponent } from '@components/shared/error-display/error-display.component';
import { NewCandidateModalComponent } from '@components/shared/new-candidate-modal/new-candidate-modal.component';
import { SignInModalComponent } from '@components/shared/sign-in-modal/sign-in-modal.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    SignInModalComponent,
    NewCandidateModalComponent,
    ErrorDisplayComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SignInModalComponent,
    NewCandidateModalComponent,
    ErrorDisplayComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
