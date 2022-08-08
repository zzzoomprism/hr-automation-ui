import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MergeService } from '@pages/merge-page/merge.service';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { CandidateAttributeType } from '@src/app/models/candidateAttributeType';

@Component({
  selector: 'app-merge-candidate',
  templateUrl: './merge-candidate.component.html',
  styleUrls: ['./merge-candidate.component.scss'],
})
export class MergeCandidateComponent {
  constructor(public mergeService: MergeService) {}

  public checked: boolean = false;

  @Input() public editable: boolean = true;

  @Input() public candidate!: MergeCandidate;

  @Input() public attributeTypes!: CandidateAttributeType[] | null;

  @Output() public delete: EventEmitter<void> = new EventEmitter<void>();

  @Output() private attributeSelectionChanged: EventEmitter<MergeCandidateAttribute> =
    new EventEmitter<MergeCandidateAttribute>();

  public selectCandidate(value: MatCheckboxChange): void {
    this.changeAttributeSelections(this.candidate.attributes, value.checked);
  }

  public changeAttributeSelections(attrs?: MergeCandidateAttribute[], selected?: boolean): void {
    if (!this.editable || !attrs) {
      return;
    }
    attrs.forEach((attr: MergeCandidateAttribute) => {
      // eslint-disable-next-line no-param-reassign
      attr.selected = selected || attr.selected;
      this.attributeSelectionChanged.emit(attr);
    });

    this.checked = this.candidate.attributes.every(
      (attr: MergeCandidateAttribute) => attr.selected
    );
  }

  public removeCandidate(): void {
    this.delete.emit();
  }
}
