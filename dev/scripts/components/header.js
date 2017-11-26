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
            uid: ''
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
                this.setState({
                    whichForm: '',
                    email: '',
                    password: '',
                    confirm: '',
                    uid: data.uid
                })
            });
        } else {
            alert('Please make sure your password and confirmed password match!')
        }
        this.props.getUid(this.state.uid)
    }

    login(event){
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((data)=>{
            this.setState({
                whichForm: '',
                email: '',
                password: '',
                confirm: '',
                uid: data.uid
            })
            this.props.getUid(this.state.uid)
        });
    }


    signOut(event){
        event.preventDefault()
        firebase.auth().signOut();
    }


    render(){
        let loginForm = '';
        if(this.state.whichForm === 'signup'){
            loginForm = (
                <div className='signUp signInForm'>
                    <h3>Don't have a Codex Account?</h3>
                    <p>Sign up now!!</p>
                    <form onSubmit={this.signup}>
                        <label htmlFor="email" className='visuallyhidden'>Email:</label>
                        <input type="text" id='email' name='email' onChange={this.handleChange} placeholder='Email'/>
                        <label htmlFor="password" className='visuallyhidden'>Password:</label>
                        <input type="password" id='password' name='password' onChange={this.handleChange} placeholder='Password'/>
                        <label htmlFor="confirm" className='visuallyhidden'>Confirm Password:</label>
                        <input type="password" id='confirm' name='confirm' onChange={this.handleChange} placeholder='Confirm Password'/>
                        <button className='button'>Sign Up</button>
                    </form>
                </div>
            )
        }
        else if(this.state.whichForm === 'login'){
            loginForm = (
                <div className='logIn signInForm'>
                    <h3>Already have a Codex Account?</h3>
                    <p>Sign in here!</p>
                    <form onSubmit={this.login}>
                        <label htmlFor="email" className='visuallyhidden'>Email:</label>
                        <input type="text" id='email' name='email' onChange={this.handleChange} placeholder='Email'/>
                        <label htmlFor="password" className='visuallyhidden'>Password:</label>
                        <input type="password" id='password' name='password' onChange={this.handleChange} placeholder='Password'/>
                        
                        <button className='button'>Sign In</button>
                    </form>
                </div>
            )
        };
        let logInOutNav = '';
        if (this.props.isLoggedIn === false) {
            logInOutNav = (
                <ul>
                    <li><a href="" className='login' id='button' onClick={this.whichForm}>Sign In</a></li>
                    <li><a href="" className='signup' id='button' onClick={this.whichForm}>Join Up</a></li>
                </ul>
            )
        }
        else if (this.props.isLoggedIn === true) {
            logInOutNav = (
                <ul>
                    <li><a href="" className='logout' onClick={this.signOut}>Sign Out</a></li>
                </ul>
                
            )
        };
        return(
            <div>
                <header>
                    <div className="wrapper">
                        <h1>Codex</h1>
                        <nav>
                            {logInOutNav}
                        </nav>
                    </div>
                </header>
                {loginForm}
            </div>
        )
    }
}

export default Header