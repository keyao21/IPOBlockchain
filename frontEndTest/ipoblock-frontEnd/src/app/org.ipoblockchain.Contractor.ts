import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ipoblockchain.Contractor{
   export abstract class Contractor extends Participant {
      contractorID: string;
   }
   export class Underwriter extends Contractor {
      remuneration: number;
      underwriterKey: string;
   }
// }
