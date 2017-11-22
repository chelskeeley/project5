import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB_lzsOu94beVHCRJM_kDibc5nQjJpdxSM",
  authDomain: "project-5-e7fa0.firebaseapp.com",
  databaseURL: "https://project-5-e7fa0.firebaseio.com",
  projectId: "project-5-e7fa0",
  storageBucket: "",
  messagingSenderId: "393325598786"
};
firebase.initializeApp(config);


class App extends React.Component {
    render() {
      return (
        <div>
          Let's crush React!
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

