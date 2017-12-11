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
import 'brace/mode/json';
import 'brace/theme/monokai';

class CreateSnippet extends React.Component {
    
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tag: '',
            snippet: ``,
            mode: '',

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

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            
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
            mode: '',
        })

    }

    render(){
        return (
        <div>

                <h2 className='createTitle'>Create a New Snippet</h2>
            <div className='createSnippet'>
                <form action="" onSubmit={this.handleSubmit}>
                    <div className='fields'>
                        <div className="title">
                            <label htmlFor="title">Title:*</label>
                            <input type="text" onChange={this.handleChange} value={this.state.title} id='title' name='title' required='true'/>
                        </div>
                        <div className="tag">
                            <label htmlFor="tag">Tags:*</label>
                            <input type="text" onChange={this.handleChange} value={this.state.tag} id='tag' name='tag' required='true'/>
                        </div>
                        <div className="description">
                            <label htmlFor="description">Enter a Description:*</label>
                            <input type="text" onChange={this.handleChange} value={this.state.description} required='true' id='description' name='description'/>
                        </div>
                        <div className="mode">
                            <label htmlFor="mode">Mode:*</label>
                            <select name="mode" id="mode" onChange={this.handleChange} value={this.state.mode} name='mode' required='true'>
                                <option>Select</option>
                                <option value="javascript">Javascript</option>
                                <option value="sass">Sass</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="java">Java</option>
                                <option value="ruby">Ruby</option>
                                <option value="python">Python</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                        <p>*Required Fields</p>
                    </div>
                    <div className='editor'>
                        <label htmlFor="reactAce">Enter Your Snippet:*</label>
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
                            width='100%'
                            highlightActiveLine={true}
                            value={this.state.snippet}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }} 
                            id='reactAce'
                            required='true'/>
                        <button className='button'>Create</button>
                    </div>

                </form>
                
            </div>
            </div>
        
        )
    }
}

export default CreateSnippet;