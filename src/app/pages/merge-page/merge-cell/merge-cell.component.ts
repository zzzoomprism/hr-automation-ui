import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';

@Component({
  selector: 'app-merge-cell',
  templateUrl: './merge-cell.component.html',
  styleUrls: ['./merge-cell.component.scss'],
})
export class MergeCellComponent {
  @Input() public value?: MergeCandidateAttribute[];

  @Input() public editable!: boolean;

  @Output() private valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onCheckboxChange(item: MergeCandidateAttribute): void {
    this.valueChange.emit(item.selected);
  }
}
