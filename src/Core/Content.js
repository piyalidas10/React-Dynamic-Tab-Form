import React, { Component } from 'react';
import Form from '../Form/Form';
import data from '../assets/data.json';

class Content extends Component {
    state = {
      tabs: ['login', 'register'],
      selected: 'login',
      formValues: data['login'],
      active: 'login',
      tabChange: false
    };
  
    clickFunction = (option) => {
      this.setState({ //method allow to update special property state nad make sure reacts know about update and update DOM
        selected: option.ele,
        formValues: data[option.ele],
        active: option.ele        
      });
      this.tabChangeHandler(true);
    };

    tabChangeHandler = (value) => {
      console.log('tabChangeHandler => ', value);
      this.setState({
        tabChange: value
      });
    }
    
  
    render() {
      console.log(this.state.tabs);
      return (
        <div className="container">
          <div className="row justify-content-md-center">
          
            <div className="col-md-auto FormSection">
              <ul className="nav nav-tabs">
                {
                  this.state.tabs.map(ele => {
                    return <li className={this.state.active === ele? 'active' : ''} key={ele}>
                      <a onClick={this.clickFunction.bind(this, {ele})}>{ele}</a>
                    </li>
                  })
                }
              </ul>
              <div className="mytab" id="mytab">
                  <h4 className="text-center">{this.state.selected}</h4>
                  <Form
                      formFields={this.state.formValues.formFields}
                      formName={this.state.formValues.pageTitle}
                      formSection={this.state.formSection}
                      btnName={this.state.formValues.btn}
                      tabChange={this.state.tabChange}
                      tabChangeHandler={this.tabChangeHandler}
                  ></Form>
              </div>
            </div>

          </div>
        </div>
      );
    }
  }

  export default Content;