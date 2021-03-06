<p align="center">
  <a href="https://www.freeiconspng.com/img/5465" title="Image from freeiconspng.com"><img src="https://www.freeiconspng.com/uploads/mobile-sms-icon-5.png" width="200" alt="mobile sms icon" /></a>
</p>

<h3 align="center">Phone Number Verification Web App</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A Web app for verifying mobile phone number through SMS
    <br> 
</p>


## 📝 Table of Contents
- [About](#about)
- [Built Using](#built_using)
- [Installation](#installation)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>
Phone Number Verfication Web App through SMS using React.js, Express.js, Node,js, Firebase and Twilio API


## ⛏️ Built Using <a name = "built_using"></a>
- [React.js](https://reactjs.org/) - Web Framework
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Firebase](https://firebase.google.com/) - Realtime Database
- [Twilio](https://www.twilio.com/) - Messaging API

## 🔧 Installation <a name = "installation"></a>
#### Set up Firebase
```
Create Firebase account on Firebase website
Create an 'util' folder inside src folder of frontend directory
Create a firebase.js file in the util folder 
In there copy the starting code of Firebase with your credentials to initialize (Which can be found on Firebase Website)
```
```javascript
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "your_key",
    authDomain: "your_key",
    databaseURL: "your_key",
    projectId: "your_key",
    storageBucket: "your_key",
    messagingSenderId: "your_key",
    appId: "your_key"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
```

#### Set up Twilio
```
Create Twilio account on Twilio website
Create an .env file inside backend directory and paste your Twilio credentials there
Make sure you have a valid phone number which is verified with Twilio
```

##### .env file
```
TWILIO_ACCOUNT_SID= 'your_key'
TWILIO_AUTH_TOKEN='your_key'
TWILIO_PHONE_NUMBER= 'your_twilio_phone_num'
```

#### Set up the server

```
cd backend
npm install
nodemon app
```

#### Set up client side

```
cd frontend
npm install
npm start
```

## ✍️ Author <a name = "authors"></a>
[@baotran01](https://github.com/baotran01)
