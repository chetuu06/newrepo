import { LightningElement ,wire,track} from 'lwc';
import fetchDependentPicklistValues from '@salesforce/apex/DependentPicklistGenerator.fetchDependentPicklistValues';

export default class Dependentpicklist extends LightningElement {

    firstName= '';
    lastName= '';
        @track typeDependentPicklistWrapperArray;
        @track typeOptions;
        @track ratingOptions;
        @track industryOptions;
        selectedTypeValue;
        selectedRatingValue;
        selectedIndustryValue;
        @wire(fetchDependentPicklistValues, {})
        wiredFetchDependentPicklistValues({ error, data }) {
            if (data) {
                try {
                    this.typeDependentPicklistWrapperArray = JSON.parse(data);
                    let options = [];
                    for (var key in JSON.parse(data)) {
                        options.push({ label: key, value: key });
                    }
                    
                    this.ratingOptions = options;
                    this.Name = undefined;
                } catch (error) {
                    console.error('check error here', error);
                }
            } else if (error) {
                console.error('check error here', error);
            }
        }
        @track fieldVisible = false;

        handleChange1(event) {
            const selectedOption = event.detail.value;
            if (selectedOption == 'option1')
            {
                this.fieldVisible = true;
            }
            else
            {
                this.fieldVisible = false;
            }
            
        }
        handleTypeChange(event) {
            try {
                this.selectedRatingValue = undefined;
                this.selectedIndustryValue = undefined;
                this.ratingOptions = undefined;
                this.Name = undefined;
                let options = [];
                this.selectedTypeValue = event.detail.value;
                if (this.typeDependentPicklistWrapperArray) {
                    for (var key in this.typeDependentPicklistWrapperArray) {
                        if (this.selectedTypeValue === key) {
                            for (var subkey in this.typeDependentPicklistWrapperArray[key]) {
                                for (var childkey in this.typeDependentPicklistWrapperArray[key][subkey]) {
                                    options.push({ label: childkey, value: childkey });
                                }
                            }
                            break;
                        }
                    }
                    options = options.filter((thing, index) => {
                        const _thing = JSON.stringify(thing);
                        return index === options.findIndex(obj => {
                            return JSON.stringify(obj) === _thing;
                        });
                    });
                    this.ratingOptions = options;
                }
            } catch (error) {
                console.error('check error here', error);
            }
    
        }
    
        handleRatingChange(event) {
            try {
                this.selectedIndustryValue = undefined;
                this.industryOptions = undefined;
                let options = [];
                this.selectedRatingValue = event.detail.value;
                if (this.typeDependentPicklistWrapperArray) {
                    for (var key in this.typeDependentPicklistWrapperArray) {
                        if (this.selectedTypeValue === key) {
                            for (var subkey in this.typeDependentPicklistWrapperArray[key])
                             {
                            //     for (var childkey in this.typeDependentPicklistWrapperArray[key][subkey]) {
                            //         if (this.selectedRatingValue === childkey) {
                            //             for (var grandchildkey in this.typeDependentPicklistWrapperArray[key][subkey][childkey]) {
                            //                 options.push({ label: this.typeDependentPicklistWrapperArray[key][subkey][childkey][grandchildkey], value: this.typeDependentPicklistWrapperArray[key][subkey][childkey][grandchildkey] });
                            //             }
                            //             break;
                            //         }
                            //     }
                            }
                        }
                    }
                    options = options.filter((thing, index) => {
                        const _thing = JSON.stringify(thing);
                        return index === options.findIndex(obj => {
                            return JSON.stringify(obj) === _thing;
                        });
                    });
                    this.industryOptions = options;
                }
            } catch (error) {
                console.error('check error here', error);
            }
    
        }
    
        handleIndustryChange(event) {
            this.selectedIndustryValue = event.detail.value;
        }
        @track selectedStep = 'Step1';
 
    handleNext() {
        var getselectedStep = this.selectedStep;
        if(getselectedStep === 'Step1'){
            this.selectedStep = 'Step4';
        }
        
    
    }
 
    handlePrev() {
        var getselectedStep = this.selectedStep;
        if(getselectedStep === 'Step4'){
            this.selectedStep = 'Step1';
        }
    

    }
      
    handleFinish() {
        alert('Finished...');
        this.selectedStep = 'Step1';
    }
      
    selectStep1() {
        this.selectedStep = 'Step1';
    }
 
   
    selectStep4() {
        this.selectedStep = 'Step4';
    }
 
    get isSelectStep4() {
        return this.selectedStep === "Step4";
    }
}
