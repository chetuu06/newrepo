import { LightningElement } from 'lwc';

export default class ParentLWC extends LightningElement {

    strOutput;

    fetchValue( event ) {

        console.log( 'Value from Child LWC is ' + event.detail );

this.strOutput = event.detail;
    }

}