import { LightningElement } from 'lwc';

export default class Ldsinlwc extends LightningElement {


    accountId;
   handleSuccess(event) {
       this.accountId = event.detail.id;
   }
   handleSubmit(event){
    event.preventDefault();       // stop the form from submitting
    const fields = event.detail.fields;
    fields.Street = '32 Prince Street';
    this.template.querySelector('lightning-record-edit-form').submit(fields);
 }
 handleSucess(event){
    const updatedRecord = event.detail.id;
    console.log('onsuccess: ', updatedRecord);
 }
 handleSuccess(event){
    const payload = event.detail;
    console.log(JSON.stringify(payload));
}

handleReset(event) {
    const inputFields = this.template.querySelectorAll(
        'lightning-input-field'
    );
    if (inputFields) {
        inputFields.forEach(field => {
            field.reset();
        });
    }
 }
}