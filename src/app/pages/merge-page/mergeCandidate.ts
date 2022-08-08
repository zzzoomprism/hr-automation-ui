import * as _ from 'lodash';
import { CandidateAttributeType } from '@src/app/models/candidateAttributeType';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { MergeCandidate } from './view-model/MergeCandidate';

export class MergeCandidates {
  private readonly candidates: MergeCandidate[];

  private readonly allAttributeTypes: CandidateAttributeType[];

  constructor(candidates: MergeCandidate[]) {
    this.candidates = candidates;
    this.allAttributeTypes = _(candidates)
      .flatMap((candidate: MergeCandidate) =>
        candidate.attributes.map((attr: MergeCandidateAttribute) => attr.attributeTypes)
      )
      .uniqBy('id')
      .reduce(
        (attrTypes: CandidateAttributeType[], attrType: CandidateAttributeType) =>
          attrTypes.concat([attrType]),
        []
      );
  }

  public getAllAttributeTypesFrom(): CandidateAttributeType[] {
    return this.allAttributeTypes;
  }

  public isEmpty(): boolean {
    return !!this.candidates.length;
  }

  public getCandidates(): MergeCandidate[] {
    return this.candidates;
  }
}
