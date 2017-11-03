import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectNode, updatePosition, dragLines, createConnection, updateAnchor } from '../actions';
import { select, selectAll, drag, event } from 'd3';

class Node extends Component {
    constructor(props) {
        super(props);
        // this.state = {x: 100, y:100};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        var rect = this.node.getBoundingClientRect();
        this.setState({rect: rect});
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2}
        this.props.dragLines(this.props.id, anchorPos);
        this.props.updateAnchor(this.props, anchorPos);
        // var nodes = selectAll('.node')
            // .call(drag().on('drag', () => this.handleDrag(this.props)));
    }

    handleDrag(e) {
        var rect = this.node.getBoundingClientRect();
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2}
        this.props.dragLines(this.props.id, anchorPos);
    }

    handleStop(e) {
        var rect = this.node.getBoundingClientRect();
        // this.setState({x: rect.x, y: rect.y});
        this.props.updatePosition(this.props.id, rect);
    }

    render() {
        if (this.props.selected) {
            var id = this.props.selected.id;
        } else {
            var id = 0;
        }
        return (
            <Draggable
                position={this.props.position}
                onDrag={(e) => this.handleDrag(e)}
                onStop={(e) => {this.handleStop(e)}}
                onMouseDown={(e) => {this.props.selectNode(this.props);}}
                >
                <div
                    ref={(node) => {this.node = node}}
                    className={(id === this.props.id) ? "node selected" : "node"}
                    style={this.props.style}>
                    <h5>{this.props.title}</h5>
                </div>
            </Draggable>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectNode, updatePosition, dragLines, createConnection, updateAnchor}, dispatch);
}

function mapStateToProps(state) {
    // should use an object as global state. with ids as keys.
    // done this way each node becomes a container... aware of the global state.
    // possibly better to have each node 'input only'.
    return {selected: state.Selected}
}

export default connect(mapStateToProps, mapDispatchToProps)(Node) // will need to connect this and make it a container.