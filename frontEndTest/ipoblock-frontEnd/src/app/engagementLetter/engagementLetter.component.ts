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
import { engagementLetterService } from './engagementLetter.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-engagementLetter',
	templateUrl: './engagementLetter.component.html',
	styleUrls: ['./engagementLetter.component.css'],
  providers: [engagementLetterService]
})
export class engagementLetterComponent implements OnInit {

  myForm: FormGroup;

  private allAssets = [];
  private asset;
  private currentId;
	private errorMessage;

  
      
          letterID = new FormControl("", Validators.required);
        
  
      
          letterHash = new FormControl("", Validators.required);
        
  
      
          companyName = new FormControl("", Validators.required);
        
  
      
          underwriterName = new FormControl("", Validators.required);
        
  
      
          companySig = new FormControl("", Validators.required);
        
  
      
          underwriterSig = new FormControl("", Validators.required);
        
  
      
          underwritingPercentage = new FormControl("", Validators.required);
        
  
      
          syndicate = new FormControl("", Validators.required);
        
  
      
          lastUpdate = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceengagementLetter:engagementLetterService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          letterID:this.letterID,
        
    
        
          letterHash:this.letterHash,
        
    
        
          companyName:this.companyName,
        
    
        
          underwriterName:this.underwriterName,
        
    
        
          companySig:this.companySig,
        
    
        
          underwriterSig:this.underwriterSig,
        
    
        
          underwritingPercentage:this.underwritingPercentage,
        
    
        
          syndicate:this.syndicate,
        
    
        
          lastUpdate:this.lastUpdate,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceengagementLetter.getAll()
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
            this.errorMessage = "HI! Could not connect to REST server. Please check your configuration details";
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

  addAsset(form: any): Promise<any> { console.log('letterID');
  console.log(this.letterID.value);
    this.asset = {
      $class: "org.ipoblockchain.Assets.engagementLetter",
      
        
          "letterID":this.letterID.value,
        
      
        
          "letterHash":this.letterHash.value,
        
      
        
          "companyName":this.companyName.value,
        
      
        
          "underwriterName":this.underwriterName.value,
        
      
        
          "companySig":this.companySig.value,
        
      
        
          "underwriterSig":this.underwriterSig.value,
        
      
        
          "underwritingPercentage":this.underwritingPercentage.value,
        
      
        
          "syndicate":false,
        
      
        
          "lastUpdate":this.lastUpdate.value,
        
      
        
          "owner":this.owner.value
        
      
    };
	
    this.myForm.setValue({
      
        
          "letterID":null,
        
      
        
          "letterHash":null,
        
      
        
          "companyName":null,
        
      
        
          "underwriterName":null,
        
      
        
          "companySig":null,
        
      
        
          "underwriterSig":null,
        
      
        
          "underwritingPercentage":null,
        
      
        
          "syndicate":null,
        
      
        
          "lastUpdate":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceengagementLetter.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "letterID":null,
        
      
        
          "letterHash":null,
        
      
        
          "companyName":null,
        
      
        
          "underwriterName":null,
        
      
        
          "companySig":null,
        
      
        
          "underwriterSig":null,
        
      
        
          "underwritingPercentage":null,
        
      
        
          "syndicate":null,
        
      
        
          "lastUpdate":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        //if(error == 'Server error'){
          //  this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        //}
        //else{
         //   this.errorMessage = error;
        //}
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.ipoblockchain.Assets.engagementLetter",
      
        
          
        
    
        
          
            "letterHash":this.letterHash.value,
          
        
    
        
          
            "companyName":this.companyName.value,
          
        
    
        
          
            "underwriterName":this.underwriterName.value,
          
        
    
        
          
            "companySig":this.companySig.value,
          
        
    
        
          
            "underwriterSig":this.underwriterSig.value,
          
        
    
        
          
            "underwritingPercentage":this.underwritingPercentage.value,
          
        
    
        
          
            "syndicate":this.syndicate.value,
          
        
    
        
          
            "lastUpdate":this.lastUpdate.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceengagementLetter.updateAsset(form.get("letterID").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "LOL Could not connect to REST server. Please check your configuration details";
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

    return this.serviceengagementLetter.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "LMAO Could not connect to REST server. Please check your configuration details";
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

    return this.serviceengagementLetter.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "letterID":null,
          
        
          
            "letterHash":null,
          
        
          
            "companyName":null,
          
        
          
            "underwriterName":null,
          
        
          
            "companySig":null,
          
        
          
            "underwriterSig":null,
          
        
          
            "underwritingPercentage":null,
          
        
          
            "syndicate":null,
          
        
          
            "lastUpdate":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.letterID){
          
            formObject.letterID = result.letterID;
          
        }else{
          formObject.letterID = null;
        }
      
        if(result.letterHash){
          
            formObject.letterHash = result.letterHash;
          
        }else{
          formObject.letterHash = null;
        }
      
        if(result.companyName){
          
            formObject.companyName = result.companyName;
          
        }else{
          formObject.companyName = null;
        }
      
        if(result.underwriterName){
          
            formObject.underwriterName = result.underwriterName;
          
        }else{
          formObject.underwriterName = null;
        }
      
        if(result.companySig){
          
            formObject.companySig = result.companySig;
          
        }else{
          formObject.companySig = null;
        }
      
        if(result.underwriterSig){
          
            formObject.underwriterSig = result.underwriterSig;
          
        }else{
          formObject.underwriterSig = null;
        }
      
        if(result.underwritingPercentage){
          
            formObject.underwritingPercentage = result.underwritingPercentage;
          
        }else{
          formObject.underwritingPercentage = null;
        }
      
        if(result.syndicate){
          
            formObject.syndicate = result.syndicate;
          
        }else{
          formObject.syndicate = null;
        }
      
        if(result.lastUpdate){
          
            formObject.lastUpdate = result.lastUpdate;
          
        }else{
          formObject.lastUpdate = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "HELLO Could not connect to REST server. Please check your configuration details";
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
      
        
          "letterID":null,
        
      
        
          "letterHash":null,
        
      
        
          "companyName":null,
        
      
        
          "underwriterName":null,
        
      
        
          "companySig":null,
        
      
        
          "underwriterSig":null,
        
      
        
          "underwritingPercentage":null,
        
      
        
          "syndicate":null,
        
      
        
          "lastUpdate":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
