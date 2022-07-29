import { Component, Input } from '@angular/core';
import { EModalSizes } from '@src/app/constants/strings';
import { Candidate } from '@src/app/models/candidates';
import { ModalService } from '@src/app/services/modal.service';
import { EditCandidateModalComponent } from '../../candidate-detail/edit-candidate-modal/edit-candidate-modal.component';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
})
export class CandidateItemComponent {
  constructor(private modalService: ModalService) {}

  @Input() candidate: Candidate | null = null;

  public openEditModal(): void {
    this.modalService.open(EditCandidateModalComponent, EModalSizes.MD);
  }
}
