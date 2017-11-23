import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/sass';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/java';
import 'brace/mode/ruby';
import 'brace/mode/python';
import 'brace/theme/monokai';

class CreateSnippet extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tag: '',
            snippet: ``,
            mode: ''

        }
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    //event listener for ace
    onChange(newValue) {
        this.setState({
            snippet: newValue
        })
    }

    //look into conditional rendering of components in react
    //maybe have a condition on the state that is like showModal: true/false
    //in jsx, have to use expressions,and if/elses are statements,  so HAVE to use ternary operator instead
    //can use in the snippet component to add and remove a certain class, then style the class/opacity etc with css

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){   
        //prevent default form action
        event.preventDefault();
        this.props.submitForm(this.state);

        this.setState({
            title: '',
            description: '',
            tag: '',
            snippet: ``,
            mode: ''
        })

    }

    render(){
        return (
            <div className='createSnippet'>
                <h2>Create a New Snippet</h2>
                <form action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.title} id='title' name='title'/>

                    <label htmlFor="tag">Tag:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.tag} id='tag' name='tag'/>

                    <label htmlFor="description">Enter a Description:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.description} id='description' name='description'/>

                    <label htmlFor="mode">Mode:</label>
                    <select name="mode" id="mode" onChange={this.handleChange} value={this.state.mode} name='mode'>
                        <option value="javascript">Javascript</option>
                        <option value="sass">Sass</option>
                        <option value="html">HTML</option>
                        <option value="css">Css</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                        <option value="python">Python</option>
                    </select>

                    <label htmlFor="reactAce">Enter Your Snippet:</label>
                    <AceEditor
                        mode={this.state.mode}
                        theme="monokai"
                        name="makeSnippet"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        height="300px"
                        highlightActiveLine={true}
                        value={this.state.snippet}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }} 
                        id='reactAce'/>

                    <button>Create</button>
                </form>
            </div>
        )
    }
}

export default CreateSnippet;