import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import firebase from 'firebase';

import Header from './components/header.js';
import CreateSnippet from './components/createsnippet.js';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB_lzsOu94beVHCRJM_kDibc5nQjJpdxSM",
  authDomain: "project-5-e7fa0.firebaseapp.com",
  databaseURL: "https://project-5-e7fa0.firebaseio.com",
  projectId: "project-5-e7fa0",
  storageBucket: "",
  messagingSenderId: "393325598786"
};
firebase.initializeApp(config);

//SAVE DATA FROM CREATESNIPPET COMPONENT TO APP STATE AND POST TO FIREBASE
  //[*]create method on App called addSnippet
  //[*]pass method through props in CreateSnippet component
     //[*]write method in createSnippet component for onsubmit that will pass the data and clear the state
  //[*]write a method on App component, that will be passed thorugh props, to get the neccessary      data from the aceComponent
  //[*]pass data from createSnippet up to firebase
  //[*]put listening for  firebase changes to update main app state in component did mount
  //[ ]render state on the page
    //[ ]create new component called DisplaySnippets in new file(import and export!!)
    //[ ]put in App component(inside of ul)
    //overarching parent element will be an <li>, only display title? and tag? in li??
//

/*
this.state = {
  firebaseKey: {
    title: `blah`,
    tag: `blahblah`,
    description: `stuff`,
    mode: 'css',
    snippet: `a bunch of code`
  }
}
*/

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        allSnippets: []
      };
      this.addSnippet = this.addSnippet.bind(this)
    }

    addSnippet(fullSnip){
      console.log(fullSnip);
      //8:50 in video for organizing object? put in an object with a key of usersSnip?
      const userSnippet = fullSnip;
      const dbRef = firebase.database().ref();
      dbRef.push(userSnippet);
    }


    componentDidMount(){
      //when App component mounts, will check if we have any data in the database, and if so can update main App state and then display it
      const dbRef = firebase.database().ref();
      dbRef.on('value', (firebaseData)=>{
        const snippetArray = [];
        const snippetData = firebaseData.val();

        for(let snipKey in snippetData){
          snippetArray.push(snippetData[snipKey])
        }
        this.setState({
          allSnippets: snippetArray
        })
      })
    }
    
    render() {
      return (
        <div>
          <Header />
          <div className='wrapper'>
            <CreateSnippet submitForm={this.addSnippet}/>
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

