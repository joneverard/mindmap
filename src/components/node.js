import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {x: 100, y:100};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({rect: rect})
    }

    handleStop(e) {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({x: rect.x, y: rect.y});
    }

    render() {
        return (
            <Draggable
                position={this.state}
                onStop={(e) => {this.handleStop(e)}}>
                <div className="node" style={this.props.style}>
                    <h5>{this.props.title}</h5>
                </div>
            </Draggable>
        )
    }
}

export default Node // will need to connect this and make it a container.