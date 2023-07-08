import { DagJWS, DagJWSResult, JWSSignature } from "dids";

export enum ReportPolicyType {
  COPYRIGHT_INFRIGMENT = 'Copyright',
  NSFW = 'NSFW',
  LEGAL_ISSUE = 'Legal',
  COMMUNITY_GUIDELINES = 'Community Guidelines',
  SPAM = 'Spam',
  PERSONAL_DETAILS = 'Personal Details',
  VIOLENCE = 'Violence',
  CHILD_ABUSE = 'Child Abuse'
}

export const reportPolicy = async (jws: DagJWSResult) => {
  const response = await fetch('/api/report/policy_violation', {
    method: 'POST',
    body: JSON.stringify(jws),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return response
}
