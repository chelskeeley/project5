import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import firebase from 'firebase';

import Header from './components/header.js';
import CreateSnippet from './components/createsnippet.js';
import SnippetList from './components/snippetList.js';

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

/*
WHEN YOU CLICK ON EACH LIST ITEM, LET USER SEE ALL SNIPPET INFO FOR WHAT THEY CLICKED ON , INCLUDING SNIPPET IN HIGHLIGHTED ACE COMPONENT



-[*] the onCLick has to be on the li in snippetList
-[*] each li already has access to all its own data as a prop
-[*] make a new component called DisplaySnippet, pass it all the data for each snippet from snippetLIst
-[*] when you click on an li, set LOCAL state of showModal in snippetLIst to true, then use a ternary operator to say if showmodal is true, render <DisplaySnippet /> else null

*/


class App extends React.Component {
    constructor(){
      super();
      this.state = {
        allSnippets: []
      };
      this.addSnippet = this.addSnippet.bind(this)
      this.removeSnippet = this.removeSnippet.bind(this)
    }

    addSnippet(fullSnip){
      const userSnippet = fullSnip;
      const dbRef = firebase.database().ref();
      dbRef.push(userSnippet);
    }

    removeSnippet(event, snippetToRemove){
      event.stopPropagation(event);
      const dbRef = firebase.database().ref(snippetToRemove);
      dbRef.remove();
    }


    componentDidMount(){
      //when App component mounts, will check if we have any data in the database, and if so can update main App state and then display it
      const dbRef = firebase.database().ref();
      dbRef.on('value', (firebaseData)=>{
        const snippetArray = [];
        const snippetData = firebaseData.val();

        for(let snipKey in snippetData){
          snippetData[snipKey].key = snipKey;
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
            <ul>{this.state.allSnippets.map((snip, i)=>{
              return <SnippetList data={snip} key={snip.key} remove={this.removeSnippet}/>
              })}
            </ul>
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

