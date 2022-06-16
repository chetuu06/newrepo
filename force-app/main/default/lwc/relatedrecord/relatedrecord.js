import { LightningElement,api,track,wire } from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';
const columns = [{
    label: 'First Name',
    fieldName: 'FirstName'
},
{
    label: 'Last Name',
    fieldName: 'LastName'
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'email'
},
{
    label: 'Phone',
    fieldName: 'phone',
    type: 'phone'
}

];
export default class Relatedrecord extends LightningElement {



    @track acc;
    @track con;
    message;
    msg;
    @track opp;
    connectedCallback(){
    fetchAccount()
    .then(result => {
    this.acc = result;
    
    console.log(JSON.stringify(result));
    console.log("result",this.acc);
    })
    
    }
    
    
    contactFetch(event){
    this.message = event.target.value;
    console.log('Contact Id-->'+this.message);
    fetchContact({accountId : this.message})
    
    .then(result => {
    this.con = result;
    
    console.log(JSON.stringify(result));
    console.log("result1",this.con);
    })
    .catch(error =>{
    this.error = error;
    
    })
    
    }}