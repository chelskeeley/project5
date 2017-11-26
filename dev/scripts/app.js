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

*/


class App extends React.Component {
    constructor(){
      super();
      this.state = {
        allSnippets: [],
        byTag: '',
        loggedIn: false,
        uid: ''
      };
      this.addSnippet = this.addSnippet.bind(this)
      this.removeSnippet = this.removeSnippet.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.userUid = this.userUid.bind(this)
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

    handleClick(event){
      event.preventDefault();
      this.setState({
        byTag: ''
      })
    }

    userUid(uid){
      console.log(uid)
    }

    componentDidMount(){
      //when App component mounts, will check if we have any data in the database, and if so can update main App state and then display it
      const dbRef = firebase.database().ref();

      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          dbRef.on('value', (firebaseData)=>{
            const snippetArray = [];
            const snippetData = firebaseData.val();
            console.log(snippetData)
            for(let snipKey in snippetData){
              snippetData[snipKey].key = snipKey;
              snippetArray.push(snippetData[snipKey])
            }
            this.setState({
              allSnippets: snippetArray
            })
          });//closes dbref on value
          this.setState({
            loggedIn: true
          })
        } else{
          this.setState({
            allSnippets: [],
            loggedIn: false
          })
          alert('You are signed out!')
        }//closes if statement
      });//closes auth state change
    }//closes component did mount
    
    render() {
      let mainContent = '';
      if(this.state.loggedIn === true){
        mainContent = (
          <div className='mainContent'>
            <CreateSnippet submitForm={this.addSnippet} />
            <h2 className='mySnips'>My Snippets</h2>
            <form className='searchByTag' action="">
              <label htmlFor="searchBox">Search By Tag:</label>
              <input type="text" onChange={this.handleChange} value={this.state.byTag} name='byTag' id='searchBox' />
              <button className='button' onClick={this.handleClick}>Clear</button>
            </form>
          </div>
        )
      }
      else {
        mainContent = (
          <div className='welcome'>
            <h3>Welcome to Codex!</h3>
            <p>Codex is awesome! You can create, save, and store your code snippets so you can access them from anywhere, at any time.</p>
            <p>Join up or sign in now!</p>
          </div>
        )
      }
      return ( 
        <div>
          <Header getUid={this.userUid} isLoggedIn={this.state.loggedIn}/>
          <div className='wrapper'>
            {mainContent}
            
            <ul className='snippetList'>
              {this.state.byTag
                ? this.state.allSnippets.filter((eachSnippet)=>
                  { return eachSnippet.tag.includes(this.state.byTag)})
                  .map((snip, i) => {
                    return <SnippetList data={snip} key={snip.key} remove={this.removeSnippet} />
                  })
                : this.state.allSnippets.map((snip, i) => {
                    return <SnippetList data={snip} key={snip.key} remove={this.removeSnippet} />
                  })
              }
            </ul>
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

