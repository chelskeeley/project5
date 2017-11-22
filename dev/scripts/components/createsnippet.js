import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class CreateSnippet extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tag: '',
            snippet: ``

        }
    this.onChange = this.onChange.bind(this);
    this.titleSave = this.titleSave.bind(this)
    }

    onChange(newValue) {
    console.log(newValue);
        this.setState({
            snippet: newValue
        })
    }

    titleSave(event){
        this.setState({
            title: event.target.value
        })
    }


    render(){
        return (
            <div className='createSnippet'>
                <h2>Create a New Snippet</h2>
                <form action="">
                    <label htmlFor="title">Title:</label>
                    <input type="text" onChange={this.titleSave} value={this.state.title} />
                    <label htmlFor="tags">Tags:</label>
                    <input type="text"/>
                    <label htmlFor="description">Enter a Description:</label>
                    <input type="text"/>
                    {/* FOR THE FUTURE, TO CHANGE SNIPPET MODE */}
                    {/* <label htmlFor="mode">Mode:</label>
                    <select name="mode" id="">
                        <option value="javascript">Javascript</option>
                        <option value="sass">Sass</option>
                        <option value="html">HTML</option>
                        <option value="css">Css</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                        <option value="python">Python</option>
                        <option value="jsx">Jsx</option>
                    </select> */}
                    <label htmlFor="reactAce">Enter Your Snippet:</label>
                    <AceEditor
                        mode="javascript"
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
                        }} />

                    <button>Create</button>

                
                
                </form>


            </div>
        )
    }
}

export default CreateSnippet;