/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { engagementLetterComponent } from './engagementLetter/engagementLetter.component';
import { registrationCertificateComponent } from './registrationCertificate/registrationCertificate.component';
import { ListingComponent } from './Listing/Listing.component';


  import { CompanyComponent } from './Company/Company.component';
  import { CEOComponent } from './CEO/CEO.component';
  import { UnderwriterComponent } from './Underwriter/Underwriter.component';
  import { SECComponent } from './SEC/SEC.component';
  import { privInvestorComponent } from './privInvestor/privInvestor.component';


  import { OfferComponent } from './Offer/Offer.component';
  import { CloseBiddingComponent } from './CloseBidding/CloseBidding.component';
  import { ELetterTxComponent } from './ELetterTx/ELetterTx.component';
  import { RCertificateTxComponent } from './RCertificateTx/RCertificateTx.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'engagementLetter', component: engagementLetterComponent},
    
		{ path: 'registrationCertificate', component: registrationCertificateComponent},
    
		{ path: 'Listing', component: ListingComponent},
    
    
      { path: 'Company', component: CompanyComponent},
      
      { path: 'CEO', component: CEOComponent},
      
      { path: 'Underwriter', component: UnderwriterComponent},
      
      { path: 'SEC', component: SECComponent},
      
      { path: 'privInvestor', component: privInvestorComponent},
      
      
        { path: 'Offer', component: OfferComponent},
        
        { path: 'CloseBidding', component: CloseBiddingComponent},
        
        { path: 'ELetterTx', component: ELetterTxComponent},
        
        { path: 'RCertificateTx', component: RCertificateTxComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
