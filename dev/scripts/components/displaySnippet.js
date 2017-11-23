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
                Hello!
            </div>
        )
    }
}

export default DisplaySnippet