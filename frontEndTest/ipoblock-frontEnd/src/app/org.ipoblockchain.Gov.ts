import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ipoblockchain.Gov{
   export enum Branch {
      JUDICIARY,
      EXECUTIVE,
      LEGISLATIVE,
   }
   export abstract class Government extends Participant {
      branch: Branch;
   }
   export class SEC extends Participant {
      secID: string;
      secKey: string;
      liaisonName: string;
   }
// }
