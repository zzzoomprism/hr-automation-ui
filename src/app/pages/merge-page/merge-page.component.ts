import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import { MergeService } from '@pages/merge-page/merge.service';
import { PageState } from '@src/app/utils/pageState';
import { CandidateAttributeType } from '@src/app/models/candidates';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { MergeCandidates } from './mergeCandidate';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit, OnDestroy {
  public pageState = new PageState();

  public candidatesMatrix!: Observable<MergeCandidates>;

  public attributeTypes!: CandidateAttributeType[];

  public candidates!: MergeCandidate[];

  public candidatesMatrixNotEmpty!: boolean;

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(public mergeService: MergeService) {
    this.candidatesMatrix = this.mergeService
      .getCandidates()
      .pipe(map((candidates) => new MergeCandidates(candidates)));
  }

  ngOnInit(): void {
    this.pageState.startLoading();
    this.candidatesMatrix.pipe(takeUntil(this.unSubscribe$)).subscribe({
      next: (matrix: MergeCandidates) => {
        if (matrix) {
          this.pageState.finishLoading();
        }
        this.candidatesMatrixNotEmpty = !matrix.isEmpty();
        this.candidates = matrix.getCandidates();
        this.attributeTypes = matrix.getAllAttributeTypesFrom();
      },
      error: (error: any) => {
        this.pageState.catchError(error);
        this.pageState.finishLoading();
      },
    });
  }

  finalResult(): MergeCandidate {
    return this.candidates.reduce((res, candidate) => {
      res.id = 'Results';
      res.attributes = (res.attributes || []).concat(
        candidate.attributes.filter((a) => a.selected)
      );
      res.attributesMap = new Map<string, MergeCandidateAttribute[]>(
        Object.entries(
          _.chain(res.attributes)
            .groupBy((attr) => attr.attributeTypes.name)
            .mapValues((item) => _.uniqBy(item, 'value'))
            .value()
        )
      );
      return res;
    }, {} as MergeCandidate);
  }

  deleteCandidate(candidate: MergeCandidate) {
    this.mergeService.deleteCandidate(candidate);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
