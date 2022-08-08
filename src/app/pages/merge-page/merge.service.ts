import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, map, distinctUntilChanged, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { NotificationMode } from '@constants/notification';
import { CandidatesService } from '@services/candidates.service';
import { NotificationService } from '@services/notification.service';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { Candidate } from '@src/app/models/candidate';
import { CandidateAttribute } from '@src/app/models/candidateAttribute';

@Injectable({
  providedIn: 'root',
})
export class MergeService {
  public candidatesIds$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private readonly candidates$: Observable<MergeCandidate[]>;

  constructor(
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {
    this.candidates$ = this.candidatesIds$.pipe(
      distinctUntilChanged(),
      mergeMap((candidatesIds: string[]) =>
        forkJoin(candidatesIds.map((id: string) => this.candidateService.getCandidateById(id)))
      ),
      map((candidates: Candidate[]) =>
        candidates.map((candidate: Candidate) => this.candidateToMergeModel(candidate))
      )
    );
  }

  public deleteCandidate(candidate: MergeCandidate): void {
    const filteredCandidatesIds: string[] = this.candidatesIds$
      .getValue()
      .filter((id: string) => id !== candidate.id);
    this.candidatesIds$.next(filteredCandidatesIds);
  }

  public mergeCandidates(): void {
    this.notification.show('Successfully merged. Check console', NotificationMode.SUCCESS);
  }

  public getCandidates(): Observable<MergeCandidate[]> {
    return this.candidates$;
  }

  public candidateToMergeModel(candidate: Candidate): MergeCandidate {
    const attributes = candidate.candidateAttributes.map((attr: CandidateAttribute) =>
      this.attributeToMergeModel(candidate.id, attr)
    );
    return {
      ...candidate,
      attributes,
      attributesMap: new Map<string, MergeCandidateAttribute[]>(
        Object.entries(
          _.groupBy(attributes, (attr: MergeCandidateAttribute) => attr.attributeTypes.name)
        )
      ),
    };
  }

  public attributeToMergeModel(
    candidateId: string,
    attr: CandidateAttribute
  ): MergeCandidateAttribute {
    return {
      ...attr,
      candidateId,
      selected: false,
    };
  }
}
