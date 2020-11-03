import React, { Component } from "react";
import "./App.css";
import PhoneInput from "./PhoneInput";
import validate from "./validator";
import firebase from "./util/firebase";
import client from "./axios/axios";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      formIsValid: false,
      formControls: {
        phoneNum: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
        },
      },
      smsAccessCode: "",
      dbAccessCode: "",
      phoneNumCheck: "",
      result: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.smsChangeHandler = this.smsChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.smsSubmitHandler = this.smsSubmitHandler.bind(this);
  }

  // Method to update state of phone number
  changeHandler = (event) => {
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls,
    };
    const updatedFormElement = {
      ...updatedControls[name],
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[name] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid,
    });
  };

  // Method to handle access code input
  smsChangeHandler = event => {
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
    
  }

  // Method to handle when submitting the phone number
  formSubmitHandler = () => {
    // Make Get request to accessCode route
    client
      .get("/accessCode")
      .then((res) => this.setState({ dbAccessCode: res.data }))
      .then(() => {
        // Interact with Firebase
        const databaseRef = firebase.database().ref("PhoneNum");
        const curphoneNum = {
          phoneNum: this.state.formControls.phoneNum.value,
          accessCode: this.state.dbAccessCode,
        };
        // Add tuples into database
        databaseRef.push(curphoneNum);
      })
      .then(() => {
        // Make post request to messages route for making text messages
        return client.post("/messages", {
          phoneNum: this.state.formControls.phoneNum.value,
          accessCode: this.state.dbAccessCode,
        });
      })
      .then((res) => {
        console.log(res.data)
        // set the state of phoneNumCheck to check if the phone number is in correct form or not
        this.setState({phoneNumCheck: res.data['success']})
      });
  };

  // Method to handle accessCode submit
  smsSubmitHandler = () => {
    const databaseRef = firebase.database().ref('PhoneNum');
    // Query the last instance that has the corresponding phone number and accessCode
    databaseRef.on('value', snapshot => {
      const users = snapshot.val();
      let usersArr = [];
      for (let id in users) {
        usersArr.push(users[id]);
      }
      let curUser = usersArr[usersArr.length-1];
      if (curUser['accessCode'] === this.state.smsAccessCode && curUser['phoneNum'] === this.state.formControls.phoneNum.value) {
        this.setState({result: true,smsAccessCode:""});
      }
      else {
        this.setState({result:false,smsAccessCode:""});
      }
    })
  }

  render() {
    const success = (
      <div>
          <h2>The phone number and the access code matches</h2>
      </div>
    );
    const failure = (
      <div>
          <h2>Please try again! The phone number and the access code does not match!</h2>
      </div>
    )
    const validPhoneNum = () => {
      if (this.state.phoneNumCheck !== '' && this.state.phoneNumCheck === false) {
        return <h2>Please enter a valid phone number (with country code like the format)</h2>;
      } else if (this.state.phoneNumCheck !== '' && this.state.phoneNumCheck === true) {
        return <h2>Access code has been successfully sent to the phone number</h2>
      }
    }
    const renderMessage = () => {
      if (this.state.result !== '' && this.state.result === true) {
        return success;
      } else if (this.state.result !== '' && this.state.result === false) {
        return failure;
      }
    }
    return (
      <div>
        <PhoneInput
          name="phoneNum"
          value={this.state.formControls.phoneNum.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.phoneNum.touched}
          valid={this.state.formControls.phoneNum.valid}
        />

        <button
          onClick={this.formSubmitHandler}
        >
          {" "}
          Submit{" "}
        </button>
        <br />
        {validPhoneNum()}
        <br />
        <div className="form-group">
          <label>Enter your access code:</label>
          <br />
          <input
            type="text"
            name="smsAccessCode"
            className= 'form-control'
            value={this.state.smsAccessCode}
            onChange={this.smsChangeHandler}
          />
          <br />
          <button onClick={this.smsSubmitHandler} disabled= {this.state.smsAccessCode === ''}>Submit</button>
          <br/>
          {renderMessage()}
        </div>
      </div>
    );
  }
}

export default FormContainer;
