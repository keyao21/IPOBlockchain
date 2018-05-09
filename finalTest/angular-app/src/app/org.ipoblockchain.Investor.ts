import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ipoblockchain.Investor{
   export abstract class Investor extends Participant {
      investorID: string;
      netWorth: number;
      heldShares: number;
      investorKey: string;
   }
   export enum StockType {
      COMMON,
      PREFERRED,
   }
   export class privInvestor extends Investor {
      name: string;
      Institution: string;
      potentialInvestment: number;
      stockType: StockType;
   }
// }
