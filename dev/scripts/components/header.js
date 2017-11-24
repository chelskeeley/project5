import React from 'react';
import firebase from 'firebase';


class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            whichForm: '',
            email: '',
            password: '',
            confirm: '',
            signedIn: false
        }
        this.whichForm = this.whichForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.signup = this.signup.bind(this)
        this.login = this.login.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    whichForm(event){
        event.preventDefault();
        this.setState({
            whichForm: event.target.className
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signup(event){
        event.preventDefault();
        if(this.state.password === this.state.confirm){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data)=>{
                console.log(data);
                this.setState({
                    signedIn: true
                })
            });
        } else {
            alert('Please make sure your password and confirmed password match!')
        }
    }

    login(event){
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((data)=>{
            console.log(data)
            this.setState({
                signedIn: true
            })
        });
    }

    signOut(event){
        event.preventDefault()
        this.setState({
            signedIn: false
        });
        firebase.auth().signOut();
    }


    render(){
        let loginForm = '';
        if(this.state.whichForm === 'signup'){
            loginForm = (
                <form onSubmit={this.signup}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id='email' name='email' onChange={this.handleChange}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' name='password' onChange={this.handleChange}/>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input type="password" id='confirm' name='confirm' onChange={this.handleChange}/>
                    <button>Sign Up</button>
                </form>
            )
        }
        else if(this.state.whichForm === 'login'){
            loginForm = (
                <form onSubmit={this.login}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id='email' name='email' onChange={this.handleChange} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' name='password' onChange={this.handleChange}/>
                    
                    <button>Sign In</button>
                </form>
            )
        };
        let logInOutNav = '';
        if (this.state.signedIn === false) {
            logInOutNav = (
                <ul>

                    <li><a href="" className='signup' onClick={this.whichForm}>Sign Up</a></li>
                    <li><a href="" className='login' onClick={this.whichForm}>Sign In</a></li>
                </ul>
            )
        }
        else if (this.state.signedIn === true) {
            logInOutNav = (
                <ul>
                    <li><a href="" className='logout' onClick={this.signOut}>Sign Out</a></li>
                </ul>
                
            )
        };
        return(
            <div>
                <header>
                    <h1>Project 5!</h1>
                    <nav>
                        {logInOutNav}
                        {/* <ul>
                            <li><a href="" className='signup' onClick={this.whichForm}>Sign Up</a></li>
                            <li><a href="" className='login' onClick={this.whichForm}>Sign In</a></li>
                        </ul> */}
                    </nav>
                </header>
                {loginForm}
            </div>
        )
    }
}

export default Header