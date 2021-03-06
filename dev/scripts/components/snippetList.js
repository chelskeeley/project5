import React from 'react';
import DisplaySnippet from './displaySnippet.js';

class SnippetList extends React.Component{
    constructor(){
        super();
        this.state = {
            showModal: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    handleClick(){
        this.setState({
            showModal: true
        })
    }

    closeModal(event){
        event.stopPropagation();
        this.setState({
            showModal: false
        })
    }

    render(){
        return(
        <li onClick={this.handleClick}>
            <h4>{this.props.data.title}</h4>
            <div className="tileTitle">
                <img src={"public/assets/coding.png"} alt="Coding Icon of angle brackets and forward slash" />
                <p><span>Tags:</span> {this.props.data.tag}</p>
            </div>
            {this.state.showModal
                ? <DisplaySnippet snipData={this.props.data} closeFun={this.closeModal} delete={this.props.remove} />
                : null
            }
        </li>)
    }
}

export default SnippetList;