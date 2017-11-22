import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class CreateSnippet extends React.Component {
    constructor(){
        super();
        this.state = {
            snippet: ''
        }
    this.onChange = this.onChange.bind(this)
    }

    onChange(newValue) {
    console.log(newValue);
        this.setState({
        snippet: newValue
        })
    }


    render(){
        return (
            <div className='createSnippet'>
                <h2>Create a New Snippet</h2>
                <form action="">
                    <label htmlFor="title">Title:</label>
                    <input type="text"/>
                    <label htmlFor="tags">Tags:</label>
                    <input type="text"/>
                    <label htmlFor="description">Enter a Description:</label>
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
                    <label htmlFor="reactAce">Enter You Snippet:</label>
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