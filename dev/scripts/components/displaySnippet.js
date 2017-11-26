import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import FontAwesome from 'react-fontawesome'
import 'brace/mode/javascript';
import 'brace/mode/sass';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/java';
import 'brace/mode/ruby';
import 'brace/mode/python';
import 'brace/mode/json';
import 'brace/theme/monokai';

class DisplaySnippet extends React.Component{
    constructor(){
        super();
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle(event){
        event.preventDefault();
        this.props.closeFun(event)
    }
    

    render(){
        return(
            <div className='snippetModal'>
                <div className="modalTitle">
                    <h4>{this.props.snipData.title}</h4>
                    <button onClick={this.clickHandle} className='button closeModal'><FontAwesome name='times'/></button>
                </div>
                <p>{this.props.snipData.description}</p>
                <p>Tags: {this.props.snipData.mode}</p>
                <p>Mode: {this.props.snipData.tag}</p>
                <p>Created on: {this.props.snipData.date}</p>
                <div className="showSnipBox">
                    <AceEditor
                        mode={this.props.snipData.mode}
                        theme="monokai"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        height="250px"
                        highlightActiveLine={true}
                        value={this.props.snipData.snippet}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        readOnly={true}
                        wrapEnabled={true} />
                </div>
                <button onClick={()=>this.props.delete(event, this.props.snipData.key)} className='button deleteSnippet'>Delete</button>
                
            </div>
        )
    }
}

export default DisplaySnippet