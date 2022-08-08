import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, filter, finalize, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import * as _ from 'lodash';
import { MergeService } from '@pages/merge-page/merge.service';
import { PageState } from '@src/app/utils/pageState';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { CandidateAttributeType } from '@src/app/models/candidateAttributeType';
import { ICONS_NAME } from '@pages/merge-page/view-model/icons-names';
import { MergeCandidates } from './mergeCandidate';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit, OnDestroy {
  public pageState: PageState = new PageState();

  public candidatesMatrix!: Observable<MergeCandidates>;

  public attributeTypes!: CandidateAttributeType[];

  public candidates!: MergeCandidate[];

  public candidatesMatrixNotEmpty!: boolean;

  public readonly iconsNames: { [key: string]: string } = ICONS_NAME;

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private mergeService: MergeService) {
    this.candidatesMatrix = this.mergeService
      .getCandidates()
      .pipe(map((candidates) => new MergeCandidates(candidates)));
  }

  public ngOnInit(): void {
    this.pageState.startLoading();
    this.candidatesMatrix
      .pipe(
        takeUntil(this.unSubscribe$),
        filter((matrix: MergeCandidates) => !!matrix),
        tap((matrix: MergeCandidates) => {
          this.candidatesMatrixNotEmpty = !matrix.isEmpty();
          this.candidates = matrix.getCandidates();
          this.attributeTypes = matrix.getAllAttributeTypesFrom();
        }),
        finalize(() => this.pageState.finishLoading()),
        catchError(async (error) => this.pageState.catchError(error))
      )
      .subscribe();
  }

  public finalResult(): MergeCandidate {
    return this.candidates.reduce((res: MergeCandidate, candidate: MergeCandidate) => {
      res.id = 'Results';
      res.attributes = (res.attributes || []).concat(
        candidate.attributes.filter((attr: MergeCandidateAttribute) => attr.selected)
      );
      res.attributesMap = new Map<string, MergeCandidateAttribute[]>(
        Object.entries(
          _.chain(res.attributes)
            .groupBy((attr: MergeCandidateAttribute) => attr.attributeTypes.name)
            .mapValues((item: MergeCandidateAttribute[]) => _.uniqBy(item, 'value'))
            .value()
        )
      );
      return res;
    }, {} as MergeCandidate);
  }

  public deleteCandidate(candidate: MergeCandidate) {
    this.mergeService.deleteCandidate(candidate);
  }

  public ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
