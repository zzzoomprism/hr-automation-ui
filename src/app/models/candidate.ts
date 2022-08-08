import { CandidateStatus } from '@constants/candidates';
import { CandidateAttribute } from './candidateAttribute';
import { CandidateAttributesValues } from './candidateAttributesValues';
import { CommunicationHistory } from './communicationHistory';
import { Keywords } from './keywords';

/**
 * @typedef Candidate
 * Represents full description of candidate
 */

export interface Candidate {
  id: string;
  lastContact: string;
  status: CandidateStatus;
  fullName: string;
  candidateUpdates: any;
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  candidateAttributesValues: CandidateAttributesValues[];
  mergeCandidates: any;
}
