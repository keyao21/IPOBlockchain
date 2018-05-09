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
import { ELetterTxService } from './ELetterTx.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ELetterTx',
	templateUrl: './ELetterTx.component.html',
	styleUrls: ['./ELetterTx.component.css'],
  providers: [ELetterTxService]
})
export class ELetterTxComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          el = new FormControl("", Validators.required);
        
  
      
          underwriter = new FormControl("", Validators.required);
        
  
      
          ceo = new FormControl("", Validators.required);
        
  
      
          transactionID = new FormControl("", Validators.required);
        
  
      
          participantSig = new FormControl("", Validators.required);
        
  
      
          newHash = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceELetterTx:ELetterTxService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          el:this.el,
        
    
        
          underwriter:this.underwriter,
        
    
        
          ceo:this.ceo,
        
    
        
          transactionID:this.transactionID,
        
    
        
          participantSig:this.participantSig,
        
    
        
          newHash:this.newHash,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceELetterTx.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.ipoblockchain.Transactions.ELetterTx",
      
        
          "el":this.el.value,
        
      
        
          "underwriter":this.underwriter.value,
        
      
        
          "ceo":this.ceo.value,
        
      
        
          "transactionID":this.transactionID.value,
        
      
        
          "participantSig":this.participantSig.value,
        
      
        
          "newHash":this.newHash.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "el":null,
        
      
        
          "underwriter":null,
        
      
        
          "ceo":null,
        
      
        
          "transactionID":null,
        
      
        
          "participantSig":null,
        
      
        
          "newHash":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceELetterTx.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "el":null,
        
      
        
          "underwriter":null,
        
      
        
          "ceo":null,
        
      
        
          "transactionID":null,
        
      
        
          "participantSig":null,
        
      
        
          "newHash":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
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


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.ipoblockchain.Transactions.ELetterTx",
      
        
          
            "el":this.el.value,
          
        
    
        
          
            "underwriter":this.underwriter.value,
          
        
    
        
          
            "ceo":this.ceo.value,
          
        
    
        
          
            "transactionID":this.transactionID.value,
          
        
    
        
          
            "participantSig":this.participantSig.value,
          
        
    
        
          
            "newHash":this.newHash.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceELetterTx.updateTransaction(form.get("transactionId").value,this.Transaction)
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


  deleteTransaction(): Promise<any> {

    return this.serviceELetterTx.deleteTransaction(this.currentId)
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

    return this.serviceELetterTx.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "el":null,
          
        
          
            "underwriter":null,
          
        
          
            "ceo":null,
          
        
          
            "transactionID":null,
          
        
          
            "participantSig":null,
          
        
          
            "newHash":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.el){
          
            formObject.el = result.el;
          
        }else{
          formObject.el = null;
        }
      
        if(result.underwriter){
          
            formObject.underwriter = result.underwriter;
          
        }else{
          formObject.underwriter = null;
        }
      
        if(result.ceo){
          
            formObject.ceo = result.ceo;
          
        }else{
          formObject.ceo = null;
        }
      
        if(result.transactionID){
          
            formObject.transactionID = result.transactionID;
          
        }else{
          formObject.transactionID = null;
        }
      
        if(result.participantSig){
          
            formObject.participantSig = result.participantSig;
          
        }else{
          formObject.participantSig = null;
        }
      
        if(result.newHash){
          
            formObject.newHash = result.newHash;
          
        }else{
          formObject.newHash = null;
        }
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
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
      
        
          "el":null,
        
      
        
          "underwriter":null,
        
      
        
          "ceo":null,
        
      
        
          "transactionID":null,
        
      
        
          "participantSig":null,
        
      
        
          "newHash":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

