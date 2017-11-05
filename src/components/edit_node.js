import React, { Component } from 'react';

class EditNode extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        console.log(e.target.value);
        this.setState({title: e.target.value});
    }

    render() {
        return (
            <input type="text" value={this.state.title} onChange={(e) => this.onInputChange(e)}/>
        )
    }
}

export default EditNode;


            // <input
            //     value={this.state.term}
            //     onChange={(e) => this.onInputChange(e.target.value)} />


            // value={this.state.title} onChange={(e) => this.handleChange(e.target.value)}