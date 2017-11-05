import React, { Component } from 'react';

class EditNode extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title};
    }

    handleChange(e) {
        this.setState({title: e.target.value})
    }

    render() {
        return (
            <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.title}></input>
        )
    }
}

export default EditNode;