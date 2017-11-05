import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NodeControls from './node_controls';
import EditNode from './edit_node';
import {
    selectNode,
    updatePosition,
    dragLines,
    updateAnchor,
    deleteNode,
    editNode,
    saveNode
} from '../actions';

class Node extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.editNode = this.editNode.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onTitleEdit = this.onTitleEdit.bind(this);
        this.saveNode = this.saveNode.bind(this);
        this.state = this.props;
    }

    componentDidMount() {
        var rect = this.node.getBoundingClientRect();
        this.setState({rect: rect});
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
        this.props.dragLines(this.props.id, anchorPos);
        this.props.updateAnchor(this.props.id, anchorPos);
    }

    getPosition() {
        var rect = this.node.getBoundingClientRect();
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
        return {rect, anchorPos};
    }

    handleDrag(e) {
        var rect = this.node.getBoundingClientRect();
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2}
        this.props.dragLines(this.props.id, anchorPos);
        // console.log('drag',e);
    }

    handleStop(e) {
        var rect = this.node.getBoundingClientRect();
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2}
        this.props.updatePosition(this.props.id, rect);
        // console.log('stop',e);
    }

    onTitleEdit(title) {
        this.setState({title: title});
        console.log(this.state);
    }

    editNode() {
        this.props.editNode(this.props.id);
    }

    saveNode() {
        this.props.saveNode(this.props.id, this.state.title);
        this.props.editNode(null);
        this.props.selectNode(null);
    }

    deleteNode() {
        this.props.deleteNode(this.props.id);
    }

    handleCancel(e) {
        this.props.editNode(null);
        this.props.selectNode(null);
    }

    render() {
        var selectedId;
        if (this.props.selected) {
            selectedId = this.props.selected.id;
        } else {
            selectedId = 0;
        }
        return (
            <Draggable
                position={this.props.position}
                onDrag={(e) => this.handleDrag(e)}
                onStop={(e) => {this.handleStop(e)}}
                onMouseDown={(e) => {this.props.selectNode(this.props);}}
                handle=".handle"
                axis={this.props.edit ? "none" : "both"}
                >
                <div className={this.props.edit ? "node-container" :"node-container handle"}>
                    <div
                        ref={(node) => {this.node = node}}
                        className={(selectedId === this.props.id) ? "node selected" : "node"}
                        style={this.props.style}>
                        {this.props.edit ?
                            <EditNode
                            title={this.props.title}
                            onTitleEdit={this.onTitleEdit}
                            saveNode={this.saveNode}/> :
                            <p>{this.props.title}</p>}
                    </div>
                    { (selectedId === this.props.id) ?
                        <NodeControls
                            edit={this.props.edit}
                            editNode={this.editNode}
                            delete={this.deleteNode}
                            cancel={(e) => this.handleCancel()}
                            saveNode={this.saveNode} /> : null}
                </div>
            </Draggable>
        )
    }
}

// this is getting a little bit messy now...

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectNode, updatePosition, dragLines, updateAnchor, deleteNode, editNode, saveNode}, dispatch);
}

function mapStateToProps(state) {
    // should use an object as global state. with ids as keys.
    return {selected: state.Selected}
}

export default connect(mapStateToProps, mapDispatchToProps)(Node);

// <NodeControls selected={id} nodeId={this.props.id} />
//                     <NodeControls selected={id} nodeId={this.props.id} delete={this.deleteNode}/>
//                    { (selectedId === this.props.id) ? <NodeControls edit={this.props.edit} delete={this.deleteNode} editNode={this.props.editNode}/> : null}

//                        {(this.props.edit) ? <EditNode title={this.props.title} /> : <p>{this.props.title}</p>}

// <div className={this.props.edit ? "" : "handle">