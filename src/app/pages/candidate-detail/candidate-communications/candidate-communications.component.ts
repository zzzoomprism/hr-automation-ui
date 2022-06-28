import { Component, Input } from '@angular/core';
import { ERROR_STATUS_CODES } from '@src/app/constants/errorStatusCode';
import { ENotificationMode } from '@src/app/constants/notification';
import { ERROR_MESSAGE } from '@src/app/constants/strings';
import { Candidate } from '@src/app/interfaces/candidates';
import { HistoryService } from '@src/app/services/history.service';
import { NotificationService } from '@src/app/services/notification.service';
import { History, HistoryElement } from '@interfaces/history';

@Component({
  selector: 'app-candidate-communications',
  styleUrls: ['candidate-communications.scss'],
  templateUrl: './candidate-communications.component.html',
})
export class CandidateCommunicationsComponent {
  @Input() candidateHistory!: History;

  @Input() candidateId!: string;

  candidate!: Candidate;

  documentStatus: Boolean = false;

  displayedColumns: string[] = ['dateofcreation', 'lastupdate', 'comment', 'action'];

  constructor(
    private _historyService: HistoryService,
    private _notification: NotificationService
  ) {}

  showAttachments() {
    this.documentStatus = !this.documentStatus;
  }

  deleteHistory(element: string) {
    this._historyService.deleteCandidateHistory(this.candidateId, element).subscribe({
      next: () => {
        this._notification.show('Candidate history is deleted', ENotificationMode.SUCCESS);
      },
      error: (err) => {
        this._notification.show(
          ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
          ENotificationMode.ERROR
        );
      },
    });
  }

  onBlur(data: any, element: HistoryElement) {
    const currentData = { ...element, comment: data.target.value };

    //  Patch method works incorrect on BE side

    this._historyService.updateCandidateHistory(this.candidateId, currentData).subscribe({
      next: () => {
        this._notification.show('Candidate history is updated', ENotificationMode.SUCCESS);
      },
      error: (err) => {
        this._notification.show(
          ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
          ENotificationMode.ERROR
        );
      },
    });
  }
}
