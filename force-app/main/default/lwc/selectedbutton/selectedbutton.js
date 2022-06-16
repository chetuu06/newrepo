import { LightningElement, track } from 'lwc';

export default class Selectedbutton extends LightningElement {
    @track optionSelected;

getSelection(event) {
    this.optionSelected = event.detail.value;
    alert(this.optionSelected);
}

get isOption1(){return this.optionSelected == 'Opt1'}
get isOption2(){return this.optionSelected == 'Opt2'}

get myoptions() {
    return [
        { label: 'Option 1', value: 'Opt1' },
        { label: 'Option 2', value: 'Opt2' },
    ];
}
}