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
import { registrationCertificateService } from './registrationCertificate.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-registrationCertificate',
	templateUrl: './registrationCertificate.component.html',
	styleUrls: ['./registrationCertificate.component.css'],
  providers: [registrationCertificateService]
})
export class registrationCertificateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          certificateID = new FormControl("", Validators.required);
        
  
      
          certificateHash = new FormControl("", Validators.required);
        
  
      
          companySig = new FormControl("", Validators.required);
        
  
      
          SECSig = new FormControl("", Validators.required);
        
  
      
          underwriterSig = new FormControl("", Validators.required);
        
  
      
          certificateStatus = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceregistrationCertificate:registrationCertificateService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          certificateID:this.certificateID,
        
    
        
          certificateHash:this.certificateHash,
        
    
        
          companySig:this.companySig,
        
    
        
          SECSig:this.SECSig,
        
    
        
          underwriterSig:this.underwriterSig,
        
    
        
          certificateStatus:this.certificateStatus,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceregistrationCertificate.getAll()
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
      $class: "org.ipoblockchain.Assets.registrationCertificate",
      
        
          "certificateID":this.certificateID.value,
        
      
        
          "certificateHash":this.certificateHash.value,
        
      
        
          "companySig":this.companySig.value,
        
      
        
          "SECSig":this.SECSig.value,
        
      
        
          "underwriterSig":this.underwriterSig.value,
        
      
        
          "certificateStatus":this.certificateStatus.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "certificateID":null,
        
      
        
          "certificateHash":null,
        
      
        
          "companySig":null,
        
      
        
          "SECSig":null,
        
      
        
          "underwriterSig":null,
        
      
        
          "certificateStatus":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceregistrationCertificate.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "certificateID":null,
        
      
        
          "certificateHash":null,
        
      
        
          "companySig":null,
        
      
        
          "SECSig":null,
        
      
        
          "underwriterSig":null,
        
      
        
          "certificateStatus":null,
        
      
        
          "owner":null 
        
      
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
      $class: "org.ipoblockchain.Assets.registrationCertificate",
      
        
          
        
    
        
          
            "certificateHash":this.certificateHash.value,
          
        
    
        
          
            "companySig":this.companySig.value,
          
        
    
        
          
            "SECSig":this.SECSig.value,
          
        
    
        
          
            "underwriterSig":this.underwriterSig.value,
          
        
    
        
          
            "certificateStatus":this.certificateStatus.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceregistrationCertificate.updateAsset(form.get("certificateID").value,this.asset)
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

    return this.serviceregistrationCertificate.deleteAsset(this.currentId)
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

    return this.serviceregistrationCertificate.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "certificateID":null,
          
        
          
            "certificateHash":null,
          
        
          
            "companySig":null,
          
        
          
            "SECSig":null,
          
        
          
            "underwriterSig":null,
          
        
          
            "certificateStatus":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.certificateID){
          
            formObject.certificateID = result.certificateID;
          
        }else{
          formObject.certificateID = null;
        }
      
        if(result.certificateHash){
          
            formObject.certificateHash = result.certificateHash;
          
        }else{
          formObject.certificateHash = null;
        }
      
        if(result.companySig){
          
            formObject.companySig = result.companySig;
          
        }else{
          formObject.companySig = null;
        }
      
        if(result.SECSig){
          
            formObject.SECSig = result.SECSig;
          
        }else{
          formObject.SECSig = null;
        }
      
        if(result.underwriterSig){
          
            formObject.underwriterSig = result.underwriterSig;
          
        }else{
          formObject.underwriterSig = null;
        }
      
        if(result.certificateStatus){
          
            formObject.certificateStatus = result.certificateStatus;
          
        }else{
          formObject.certificateStatus = null;
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
      
        
          "certificateID":null,
        
      
        
          "certificateHash":null,
        
      
        
          "companySig":null,
        
      
        
          "SECSig":null,
        
      
        
          "underwriterSig":null,
        
      
        
          "certificateStatus":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
