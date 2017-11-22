import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class CreateSnippet extends React.Component {
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
                    <input type="text"/>
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
                        height='300px'
                        highlightActiveLine={true}
                        value={`function replace(allWith) {
    yourSnippet;
}`}
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