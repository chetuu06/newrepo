import { LightningElement, wire, api, track } from "lwc";

import {createRecord} from "lightning/uiRecordApi";
import CONFIG_OBJECT from '@salesforce/schema/configuration__c';
import OBJECT_NAME from '@salesforce/schema/configuration__c.Name';
import FIELD_NAME from '@salesforce/schema/configuration__c.Selected_Field__c';



import getfields from "@salesforce/apex/dynamicObjectList.getfields";
//import { getRecord } from 'lightning/uiRecordApi';

export default class TestComponent extends LightningElement {

    @api selectedValue =false;
   // @track objName = '';

    get options(){
        return [
            {label:'Account', value:'account'},
            {label:'Contact', value:'Contact'},
            {label:'Lead', value:'Lead'},
            {label:'Opportunity', value:'Opportunity'},
        ];
    }

    handleChange(event){
        this.selectedValue = event.detail.value;
    //  this.objName = this.selectedValue;
    }

 @track data1 = [];
  @track selected = [];
  @api value = "";
  @api fieldsValue = [];

 get selectFields() {
    return this.data1;
  }
  get selected() {
    return this.selected.length ? this.selected : "none";
  }
  
//   get objName(){
//       return this.selectedValue;
//   }

		 @wire(getfields,{
		 objectname: '$selectedValue'})
  wiredClass({ data, error }) {
    if (data) {
     let Testdata = JSON.parse(JSON.stringify(data));
        let lstOption = [];
      for (var i = 0;i < Testdata.length;i++) {
          lstOption.push({value: Testdata[i].QualifiedApiName,label: Testdata[i].DeveloperName
          });
        }
        this.data1 = lstOption;
        this.showLoadingSpinner = false;
    } else if (error) {
      this.error = error;
    }
  }
  
   handleSelectFields(event) {
    this.selected = event.detail.value;
    this.fieldsValue = event.detail.value;
    if(this.fieldsValue.length > 0 ){
      this.disableGetRecords = false;
    }else{
      this.disableGetRecords = true;
    }
    
  }
    Name;
    selectcom;





  handleSave(){
      // var fields ={};
      // fields[OBJECT_NAME.fieldApiName] = this.selectedValue;

      var fields = {'Name' :this.selectedValue, 'Selected_Field__c' : this.fieldsValue};

      var recordInput = {'apiName' : 'configuration__c', fields};
        

      //const recordInput = { apiName :CONFIG_OBJECT.objectApiName, fields }

      createRecord(recordInput)
      .then(cinfiguration =>{
        console.log(JSON.stringify(cinfiguration));
      })
      .catch(error =>{
        console.log(error);
      })
      
    }
  
  } 
