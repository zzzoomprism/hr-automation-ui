import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidatesService } from '@services/candidates.service';
import { Candidate, CandidatesFilterData } from '@src/app/models/candidates';
import { PageState } from '@utils/pageState';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  public candidatesList: Candidate[] = [];

  public pageState = new PageState();

  public filterForm!: FormGroup;

  public keywordsList: any[] = [];

  public keywordsInput = '';

  constructor(private candidatesService: CandidatesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      email: [''],
    });
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  public getCandidatesList(filterData: CandidatesFilterData) {
    this.pageState.startLoading();

    this.candidatesService.getCandidates(filterData).subscribe({
      next: (resolve: Candidate[]) => {
        this.candidatesList = resolve;
        this.pageState.finishLoading();
      },
      error: (error: any) => {
        this.pageState.catchError(error);
        this.pageState.finishLoading();
      },
    });
  }

  public remove($event: any): void {
    this.keywordsList = this.keywordsList?.filter((el) => el !== $event);
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }

  public add($event: any): void {
    this.keywordsList.push($event?.target?.value.toLowerCase());
    this.keywordsInput = '';
    this.getCandidatesList({ pageNumber: 1, pageSize: 100, keyword: this.keywordsList });
  }
}
