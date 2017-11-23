import React from 'react';
import DisplaySnippet from './displaySnippet.js'

class SnippetList extends React.Component{
    constructor(){
        super();
        this.state = {
            showModal: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({
            showModal: true
        })
    }

    render(){
        return(
        <li onClick={this.handleClick}>
            <h4>{this.props.data.title}</h4>
            <p>{this.props.data.tag}</p>
            {this.state.showModal
                ? <DisplaySnippet snipData={this.props.data} />
                :null
            }

        </li>)
    }
}

export default SnippetList;