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
import { privInvestorService } from './privInvestor.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-privInvestor',
	templateUrl: './privInvestor.component.html',
	styleUrls: ['./privInvestor.component.css'],
  providers: [privInvestorService]
})
export class privInvestorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          name = new FormControl("", Validators.required);
        
  
      
          Institution = new FormControl("", Validators.required);
        
  
      
          potentialInvestment = new FormControl("", Validators.required);
        
  
      
          stockType = new FormControl("", Validators.required);
        
  
      
          investorID = new FormControl("", Validators.required);
        
  
      
          netWorth = new FormControl("", Validators.required);
        
  
      
          heldShares = new FormControl("", Validators.required);
        
  
      
          investorKey = new FormControl("", Validators.required);
        
  


  constructor(private serviceprivInvestor:privInvestorService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          name:this.name,
        
    
        
          Institution:this.Institution,
        
    
        
          potentialInvestment:this.potentialInvestment,
        
    
        
          stockType:this.stockType,
        
    
        
          investorID:this.investorID,
        
    
        
          netWorth:this.netWorth,
        
    
        
          heldShares:this.heldShares,
        
    
        
          investorKey:this.investorKey
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceprivInvestor.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.ipoblockchain.Investor.privInvestor",
      
        
          "name":this.name.value,
        
      
        
          "Institution":this.Institution.value,
        
      
        
          "potentialInvestment":this.potentialInvestment.value,
        
      
        
          "stockType":this.stockType.value,
        
      
        
          "investorID":this.investorID.value,
        
      
        
          "netWorth":this.netWorth.value,
        
      
        
          "heldShares":this.heldShares.value,
        
      
        
          "investorKey":this.investorKey.value
        
      
    };

    this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "Institution":null,
        
      
        
          "potentialInvestment":null,
        
      
        
          "stockType":null,
        
      
        
          "investorID":null,
        
      
        
          "netWorth":null,
        
      
        
          "heldShares":null,
        
      
        
          "investorKey":null
        
      
    });

    return this.serviceprivInvestor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "Institution":null,
        
      
        
          "potentialInvestment":null,
        
      
        
          "stockType":null,
        
      
        
          "investorID":null,
        
      
        
          "netWorth":null,
        
      
        
          "heldShares":null,
        
      
        
          "investorKey":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.ipoblockchain.Investor.privInvestor",
      
        
          
            "name":this.name.value,
          
        
    
        
          
            "Institution":this.Institution.value,
          
        
    
        
          
            "potentialInvestment":this.potentialInvestment.value,
          
        
    
        
          
            "stockType":this.stockType.value,
          
        
    
        
          
        
    
        
          
            "netWorth":this.netWorth.value,
          
        
    
        
          
            "heldShares":this.heldShares.value,
          
        
    
        
          
            "investorKey":this.investorKey.value
          
        
    
    };

    return this.serviceprivInvestor.updateParticipant(form.get("investorID").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceprivInvestor.deleteParticipant(this.currentId)
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

    return this.serviceprivInvestor.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "name":null,
          
        
          
            "Institution":null,
          
        
          
            "potentialInvestment":null,
          
        
          
            "stockType":null,
          
        
          
            "investorID":null,
          
        
          
            "netWorth":null,
          
        
          
            "heldShares":null,
          
        
          
            "investorKey":null 
          
        
      };



      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
        }
      
        if(result.Institution){
          
            formObject.Institution = result.Institution;
          
        }else{
          formObject.Institution = null;
        }
      
        if(result.potentialInvestment){
          
            formObject.potentialInvestment = result.potentialInvestment;
          
        }else{
          formObject.potentialInvestment = null;
        }
      
        if(result.stockType){
          
            formObject.stockType = result.stockType;
          
        }else{
          formObject.stockType = null;
        }
      
        if(result.investorID){
          
            formObject.investorID = result.investorID;
          
        }else{
          formObject.investorID = null;
        }
      
        if(result.netWorth){
          
            formObject.netWorth = result.netWorth;
          
        }else{
          formObject.netWorth = null;
        }
      
        if(result.heldShares){
          
            formObject.heldShares = result.heldShares;
          
        }else{
          formObject.heldShares = null;
        }
      
        if(result.investorKey){
          
            formObject.investorKey = result.investorKey;
          
        }else{
          formObject.investorKey = null;
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
      
        
          "name":null,
        
      
        
          "Institution":null,
        
      
        
          "potentialInvestment":null,
        
      
        
          "stockType":null,
        
      
        
          "investorID":null,
        
      
        
          "netWorth":null,
        
      
        
          "heldShares":null,
        
      
        
          "investorKey":null 
        
      
      });
  }

}
