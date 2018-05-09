import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// import {Participant} from './org.hyperledger.composer.system';
// export namespace org.ipoblockchain.Assets{
   export enum ProcessPhase {
      BEAUTY_CONTEST,
      IN_REGISTRATION,
      ROAD_SHOW,
      PRICING,
      INITIAL_SALE,
   }
   export class engagementLetter extends Asset {
      letterID: string;
      letterHash: string;
      companyName: string;
      underwriterName: string;
      companySig: string;
      underwriterSig: string;
      underwritingPercentage: number;
      owner: Participant;
   }
   export enum CertStatus {
      NOT_APPLIED,
      PENDING,
      APPROVED,
      DENIED,
      NEEDS_UW_SIG,
   }
   export class registrationCertificate extends Asset {
      certificateID: string;
      certificateHash: string;
      companySig: string;
      SECSig: string;
      underwriterSig: string;
      certificateStatus: CertStatus;
      owner: Participant;
   }
// }
