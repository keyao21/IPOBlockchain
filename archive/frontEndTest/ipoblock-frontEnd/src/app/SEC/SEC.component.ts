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
import { SECService } from './SEC.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-SEC',
	templateUrl: './SEC.component.html',
	styleUrls: ['./SEC.component.css'],
  providers: [SECService]
})
export class SECComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          secID = new FormControl("", Validators.required);
        
  
      
          secKey = new FormControl("", Validators.required);
        
  
      
          liaisonName = new FormControl("", Validators.required);
        
  


  constructor(private serviceSEC:SECService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          secID:this.secID,
        
    
        
          secKey:this.secKey,
        
    
        
          liaisonName:this.liaisonName
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSEC.getAll()
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
      $class: "org.ipoblockchain.Gov.SEC",
      
        
          "secID":this.secID.value,
        
      
        
          "secKey":this.secKey.value,
        
      
        
          "liaisonName":this.liaisonName.value
        
      
    };

    this.myForm.setValue({
      
        
          "secID":null,
        
      
        
          "secKey":null,
        
      
        
          "liaisonName":null
        
      
    });

    return this.serviceSEC.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "secID":null,
        
      
        
          "secKey":null,
        
      
        
          "liaisonName":null 
        
      
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
      $class: "org.ipoblockchain.Gov.SEC",
      
        
          
        
    
        
          
            "secKey":this.secKey.value,
          
        
    
        
          
            "liaisonName":this.liaisonName.value
          
        
    
    };

    return this.serviceSEC.updateParticipant(form.get("secID").value,this.participant)
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

    return this.serviceSEC.deleteParticipant(this.currentId)
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

    return this.serviceSEC.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "secID":null,
          
        
          
            "secKey":null,
          
        
          
            "liaisonName":null 
          
        
      };



      
        if(result.secID){
          
            formObject.secID = result.secID;
          
        }else{
          formObject.secID = null;
        }
      
        if(result.secKey){
          
            formObject.secKey = result.secKey;
          
        }else{
          formObject.secKey = null;
        }
      
        if(result.liaisonName){
          
            formObject.liaisonName = result.liaisonName;
          
        }else{
          formObject.liaisonName = null;
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
      
        
          "secID":null,
        
      
        
          "secKey":null,
        
      
        
          "liaisonName":null 
        
      
      });
  }

}
