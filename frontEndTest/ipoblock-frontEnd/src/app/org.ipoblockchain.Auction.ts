import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Company} from './org.ipoblockchain.Business';
import {Investor} from './org.ipoblockchain.Investor';
// export namespace org.ipoblockchain.Auction{
   export class Listing extends Asset {
      listingID: string;
      totalShares: number;
      remainingShares: number;
      capitalRaised: number;
      offers: Offer[];
      company: Company;
   }
   export class Bid {
      price: number;
      shares: number;
   }
   export class Offer extends Transaction {
      bid: Bid;
      listing: Listing;
      investor: Investor;
   }
   export class CloseBidding extends Transaction {
      listing: Listing;
   }
// }
