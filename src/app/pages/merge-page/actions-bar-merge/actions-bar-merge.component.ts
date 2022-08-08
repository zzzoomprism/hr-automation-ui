import { Component } from '@angular/core';
import { MergeService } from '@pages/merge-page/merge.service';

@Component({
  selector: 'app-actions-bar-merge',
  templateUrl: './actions-bar-merge.component.html',
  styleUrls: ['./actions-bar-merge.component.scss'],
})
export class ActionsBarMergeComponent {
  constructor(private mergeService: MergeService) {}

  public mergeCandidates(): void {
    this.mergeService.mergeCandidates();
  }
}
