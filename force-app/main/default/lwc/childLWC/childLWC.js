import { LightningElement } from 'lwc';
export default class ChildLWC extends LightningElement {
    strInput;

    handleChange( event ) {   
this.strInput = event.target.value
    }
passToParent(){
console.log( 'Input is ' + this.strInput);
this.dispatchEvent(new CustomEvent('pass',{detail:this.strInput}));
}
}