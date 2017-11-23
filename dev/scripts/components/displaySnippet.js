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

class DisplaySnippet extends React.Component{

    render(){
        return(
            <div className='snippetModal'>
                <h4>{this.props.snipData.title}</h4>
                <p>{this.props.snipData.description}</p>
                <p>Tags ({this.props.snipData.mode}), Mode ({this.props.snipData.tag})</p>
                <AceEditor
                    mode={this.props.snipData.mode}
                    theme="monokai"
                    // name="makeSnippet"
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    height="300px"
                    highlightActiveLine={true}
                    value={this.props.snipData.snippet}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                    // id='reactAce'
                    readOnly={true} />
            </div>
        )
    }
}

export default DisplaySnippet