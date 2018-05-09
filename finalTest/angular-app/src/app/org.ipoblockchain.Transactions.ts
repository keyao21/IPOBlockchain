import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {engagementLetter,registrationCertificate} from './org.ipoblockchain.Assets';
import {CEO} from './org.ipoblockchain.Business';
import {Underwriter} from './org.ipoblockchain.Contractor';
import {SEC} from './org.ipoblockchain.Gov';
// export namespace org.ipoblockchain.Transactions{
   export abstract class lifecycleTransaction extends Transaction {
      transactionID: string;
      participantSig: string;
      newHash: string;
   }
   export class ELetterTx extends lifecycleTransaction {
      el: engagementLetter;
      underwriter: Underwriter;
      ceo: CEO;
   }
   export class RCertificateTx extends lifecycleTransaction {
      rc: registrationCertificate;
      underwriter: Underwriter;
      ceo: CEO;
      sec: SEC;
   }
// }
