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
ALLOW THE USER TO SEARCH SNIPPETS BY TAG, AND FILTER THE RESULTS TO SHOW ONLY SNIPPES WHERE THE SEARCHED STRING MATCHES THE TAG
-[ ] make a new search input box and label
-[ ] add a state to the search which tracks the onChange, then update the state
-[ ] filter through the state array of objects(all snippets), and display snippets where the value of the tag property includes() the byTag state string
*/


class App extends React.Component {
    constructor(){
      super();
      this.state = {
        allSnippets: [],
        byTag: ''
      };
      this.addSnippet = this.addSnippet.bind(this)
      this.removeSnippet = this.removeSnippet.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    addSnippet(fullSnip){
      const userSnippet = fullSnip;
      const dbRef = firebase.database().ref();
      let currentDate = new Date().toDateString();
      userSnippet.date = currentDate
      dbRef.push(userSnippet);
    }

    removeSnippet(event, snippetToRemove){
      event.stopPropagation(event);
      const dbRef = firebase.database().ref(snippetToRemove);
      dbRef.remove();
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value,

      })
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
            <div>
              <label htmlFor="searchBox">Search By Tag:</label>
              <input type="text" onChange={this.handleChange} value={this.state.byTag} name='byTag' />
            </div>
            
            <ul>
              {this.state.byTag
                ? this.state.allSnippets.filter((eachSnippet)=>
                  // { return eachSnippet.tag == this.state.byTag})
                  { return eachSnippet.tag.includes(this.state.byTag)})
                  .map((snip, i) => {
                    return <SnippetList data={snip} key={snip.key} remove={this.removeSnippet} />
                  })
                : this.state.allSnippets.map((snip, i) => {
                    return <SnippetList data={snip} key={snip.key} remove={this.removeSnippet} />
                  })
              }
            </ul>
            {/* <ul>{this.state.allSnippets.map((snip, i) => {
              return <SnippetList data={snip} key={snip.key} remove={this.removeSnippet} />
            })}
            </ul> */}
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

