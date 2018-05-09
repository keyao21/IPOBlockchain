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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ListingService } from './Listing.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Listing',
	templateUrl: './Listing.component.html',
	styleUrls: ['./Listing.component.css'],
  providers: [ListingService]
})
export class ListingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          listingID = new FormControl("", Validators.required);
        
  
      
          totalShares = new FormControl("", Validators.required);
        
  
      
          remainingShares = new FormControl("", Validators.required);
        
  
      
          capitalRaised = new FormControl("", Validators.required);
        
  
      
          offers = new FormControl("", Validators.required);
        
  
      
          company = new FormControl("", Validators.required);
        
  


  constructor(private serviceListing:ListingService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          listingID:this.listingID,
        
    
        
          totalShares:this.totalShares,
        
    
        
          remainingShares:this.remainingShares,
        
    
        
          capitalRaised:this.capitalRaised,
        
    
        
          offers:this.offers,
        
    
        
          company:this.company
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceListing.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.ipoblockchain.Auction.Listing",
      
        
          "listingID":this.listingID.value,
        
      
        
          "totalShares":this.totalShares.value,
        
      
        
          "remainingShares":this.remainingShares.value,
        
      
        
          "capitalRaised":this.capitalRaised.value,
        
      
        
          "offers":this.offers.value,
        
      
        
          "company":this.company.value
        
      
    };

    this.myForm.setValue({
      
        
          "listingID":null,
        
      
        
          "totalShares":null,
        
      
        
          "remainingShares":null,
        
      
        
          "capitalRaised":null,
        
      
        
          "offers":null,
        
      
        
          "company":null
        
      
    });

    return this.serviceListing.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "listingID":null,
        
      
        
          "totalShares":null,
        
      
        
          "remainingShares":null,
        
      
        
          "capitalRaised":null,
        
      
        
          "offers":null,
        
      
        
          "company":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.ipoblockchain.Auction.Listing",
      
        
          
        
    
        
          
            "totalShares":this.totalShares.value,
          
        
    
        
          
            "remainingShares":this.remainingShares.value,
          
        
    
        
          
            "capitalRaised":this.capitalRaised.value,
          
        
    
        
          
            "offers":this.offers.value,
          
        
    
        
          
            "company":this.company.value
          
        
    
    };

    return this.serviceListing.updateAsset(form.get("listingID").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceListing.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceListing.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "listingID":null,
          
        
          
            "totalShares":null,
          
        
          
            "remainingShares":null,
          
        
          
            "capitalRaised":null,
          
        
          
            "offers":null,
          
        
          
            "company":null 
          
        
      };



      
        if(result.listingID){
          
            formObject.listingID = result.listingID;
          
        }else{
          formObject.listingID = null;
        }
      
        if(result.totalShares){
          
            formObject.totalShares = result.totalShares;
          
        }else{
          formObject.totalShares = null;
        }
      
        if(result.remainingShares){
          
            formObject.remainingShares = result.remainingShares;
          
        }else{
          formObject.remainingShares = null;
        }
      
        if(result.capitalRaised){
          
            formObject.capitalRaised = result.capitalRaised;
          
        }else{
          formObject.capitalRaised = null;
        }
      
        if(result.offers){
          
            formObject.offers = result.offers;
          
        }else{
          formObject.offers = null;
        }
      
        if(result.company){
          
            formObject.company = result.company;
          
        }else{
          formObject.company = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "listingID":null,
        
      
        
          "totalShares":null,
        
      
        
          "remainingShares":null,
        
      
        
          "capitalRaised":null,
        
      
        
          "offers":null,
        
      
        
          "company":null 
        
      
      });
  }

}
