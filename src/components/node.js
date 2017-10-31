import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectNode } from '../actions';

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
                onStop={(e) => {this.handleStop(e)}}
                onMouseDown={(e) => {this.props.selectNode(this.props.id);}}>
                <div
                    className={(this.props.selected === this.props.id) ? "node selected" : "node"}
                    style={this.props.style}>
                    <h5>{this.props.title}</h5>
                </div>
            </Draggable>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectNode}, dispatch);
}

function mapStateToProps(state) {
    // should use an object as global state. with ids as keys.
    // done this way each node becomes a container... aware of the global state.
    // possibly better to have each node 'input only'.
    return {selected: state.Selected}
}

export default connect(mapStateToProps, mapDispatchToProps)(Node) // will need to connect this and make it a container.