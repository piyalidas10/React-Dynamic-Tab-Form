
import React, { useState, useEffect } from 'react';
import Error from '../Error/Error';

const Formfield = (props) => {
    console.log(props);
    const {ele:{input, key, required, items}, valids, onInputHandler} = props;
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState({});
    let formClasses = ['form-control'];

    const handleChange = (event, param) => {
        const { name } = event.target;
        console.log('event => ', event);
        let checkValidationReturn = checkValidation(event, param);
        setCount(checkValidationReturn.error);
        console.log({[name]: checkValidationReturn.value});
        onInputHandler({[name]: checkValidationReturn.value});
    };

    const checkValidation = (event, param) => {
        console.log(param);
        const { name, value } = event.target;
        console.log('----------------------------------------------', value);
        let error = {};
        let requiredCheck, patternCheck, minlengthCheck, emailIdCheck;
        if (param) {
            requiredCheck = param.find(ele => ele.valid === 'required');
            patternCheck = param.find(ele => ele.valid === 'pattern');
            minlengthCheck = param.find(ele => ele.valid === 'minlength');
            emailIdCheck = param.find(ele => ele.valid === 'emailId');
        }
        console.log(patternCheck);
        if (requiredCheck && Object.keys(requiredCheck).length > 0 && value.length === 0) {
            error = {errorTxt: name + requiredCheck.error};
        } else if (patternCheck && Object.keys(patternCheck).length > 0) {
            if (!value.match(patternCheck.validator)) {
                error = {errorTxt: name + patternCheck.error};
            } else {
                error = {};
            }
        } else {
            error = {};
        }
        return {error, value};
    };

    useEffect(() => {
        // Update the document title using the browser API
        return console.log('useEffect');
    });

    if (Object.keys(count).length > 0)  {
        formClasses.push('error');
    }

    return (
        <div className="form-group" key={key}>
        {
            (input === 'text' || input === 'email' || input === 'password' || input === 'number' || input === 'date') ? (
                <div className="row">
                    <label className="col-md-4">{key}</label>
                        <div className="col-md-8">
                            <input
                            className={formClasses.join(' ')}
                            type={input}
                            name={key}
                            placeholder={key}
                            required={required}
                            minLength={3}
                            maxLength={30}
                            onChange={(e) => handleChange(e, props.valids)}/>
                            {
                                Object.keys(count).length > 0 && (
                                    <Error name={key} error={count} />
                                )
                            }
                        </div>
                </div> 
            ) : (
                <React.Fragment>
                  {
                     (input === 'radio')? (
                        <div className="row">
                        <label className="col-md-4">{key}</label>
                        {
                            items.map(eleRadio => (
                                <div className="form-check-inline" key={eleRadio.name}>
                                    <label className="form-check-label">
                                        <input
                                        type={input}
                                        className="form-check-input"
                                        name={key}
                                        placeholder={eleRadio.name}
                                        required={required}
                                        value={eleRadio.name}
                                        onChange={handleChange}/>
                                        {eleRadio.name}
                                    </label>
                                </div>
                            ))
                        }
                        {
                                Object.keys(count).length > 0 && (
                                    <Error name={key} error={count} />
                                )
                        }
                        </div>
                     ) : (
                        <div className="row">
                            <label className="col-md-4">{key}</label>
                            <div className="col-md-8">
                                <textarea 
                                className="form-control"
                                name={key}
                                placeholder={key}
                                onChange={handleChange}
                                minLength={3}
                                maxLength={100}
                                required={required}></textarea>
                            </div>
                            {
                                Object.keys(count).length > 0 && (
                                    <Error name={key} error={count} />
                                )
                            }
                        </div>
                     )
                  }
                </React.Fragment>
            )
               
        }
        </div>                  
    )
}
export default Formfield;
