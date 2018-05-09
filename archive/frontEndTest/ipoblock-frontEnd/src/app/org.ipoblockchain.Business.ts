import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ipoblockchain.Business{
   export class Company extends Participant {
      companyID: string;
      companyName: string;
   }
   export abstract class Employee extends Company {
      heldShares: number;
      EmployeeID: string;
   }
   export class CEO extends Employee {
      name: string;
   }
// }
