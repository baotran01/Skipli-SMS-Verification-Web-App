import React from "react";

const PhoneInput = (props) => {
  let formControl = "form-control";
  if (props.touched && !props.valid) {
    formControl = "form-control control-error";
  }
  return (
    <div className="form-group">
    <label>Enter your phone number with country code:</label><br/>
    <label>Please make sure you have verified your phone number with Twilio or using a Twilio number, otherwise the messages would not be sent</label><br/>
      <input
        type="tel"
        className={formControl}
        placeholder = '+12345678910'
        {...props}
      />
    </div>
  );
};

export default PhoneInput;
