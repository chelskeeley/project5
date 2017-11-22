import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import firebase from 'firebase';

import Header from './components/header.js';
import CreateSnippet from './components/createsnippet.js';

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

//add the react ace component to the page




class App extends React.Component {
    render() {
      return (
        <div>
          <Header />
          <div className='wrapper'>
            <CreateSnippet />
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

