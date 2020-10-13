import React, { Component } from 'react';
import Formfield from '../Formfield/Formfield';

class Form extends Component { 
    constructor(props) {
        super(props);
        this.state= {
            formName: this.props.formName,
            formData: {},
            allFormErrorsCount: 0,
            allFormErrorTxt: '',
            allFormSuccessTxt: '',
            isSubmit: false,
            isFormInvalid: false 
        };

    }

    static getDerivedStateFromProps(props, state) {
        console.log('---------------------------', props);
        const getformData = {};
        props.formFields.forEach(ele => {
            Object.assign(getformData, {[ele.key]: ''});
        });
        if(state.formName !== props.formName && state.isFormInvalid) {
            return {
                isFormInvalid : false ,
                isSubmit: false,
                formName:  props.formName,
                formData: getformData,
            }
        }
        if(state.formName !== props.formName) {
            return {
                isSubmit: false,
                formName:  props.formName,
                formData: getformData,
            }
        }
        return false;        
    }

    // submit the form logic
    formSubmit = (e) => {
        e.preventDefault();
        const {formFields} = this.props;
        let valuesOfRequiredFields = [];
        // get the form
        let formName = document.forms[this.props.formName];
        console.log(formName);
        formFields.forEach(formElem => {
            if ((formElem.valids.filter(ele => ele.valid === 'required')).length > 0) {
                const fieldName = formElem.key;
                console.log(fieldName);
                // get the form element
                if (formName) {
                    let formElem = formName.elements[fieldName];
                    console.log(formElem.value);
                    if (formElem.value !== '') {
                        valuesOfRequiredFields.push(formElem.value);
                    } else {
                        valuesOfRequiredFields.push(this.state.formData[fieldName]);
                    }
                }
            }
        });
        console.log('formData after submit =>', valuesOfRequiredFields);
        const isFormInvalid = valuesOfRequiredFields.some(field => field === '');
        if (isFormInvalid) {
            this.setState({
                isFormInvalid: isFormInvalid,
                allFormErrorTxt : 'Please fillup required fields',
                isSubmit: true
            });
        } else {
            this.setState({
                isFormInvalid: isFormInvalid,
                allFormErrorTxt : '',
                allFormSuccessTxt: this.props.formName + ' is successfull',
                isSubmit: true
            });
        }  
    }

    inputHandler = (fieldName, fieldValue) => {
        console.log('inputHandler==>',fieldName);
        const gedata = {
                ...this.state.formData,
                [fieldName]: fieldValue
        }
        console.log('gedata===>', gedata);
        this.setState({
            formData: {
                ...this.state.formData,
                [fieldName]: fieldValue
            }
        },() => {
            console.log('Callback => ', this.state.formData);
        });
    }

    render() 
    { 
        const {formFields} = this.props;
        console.log('---------------------------', this.state.formData);
        return (
            <div>
                {
                    this.state.isFormInvalid && this.state.isSubmit &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.allFormErrorTxt}
                        </div>
                }
                {
                    !this.state.isFormInvalid && this.state.isSubmit &&
                        <div className="alert alert-success" role="alert">
                            {this.state.allFormSuccessTxt}
                        </div>
                }
                <form className="mt-4" name={this.props.formName} onSubmit={this.formSubmit} noValidate>
                    {
                        formFields.map(ele => {
                            return (
                                <Formfield
                                ele={ele}
                                key={ele.key}
                                valids={ele.valids}
                                onInputHandler={this.inputHandler}
                                ></Formfield>
                            )
                        })
                    }
                    <div className="form-group text-center">
                        <button className="btn btn-primary" type="submit">{this.props.btnName}</button>
                    </div>
                </form>
            </div>
        )
    } 
} 

export default Form;