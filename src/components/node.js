import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from '../utilities';
import NodeControls from './node_controls';
import EditNode from './edit_node';
import NodeEditor from './node_editor';
import NodeHeader from './node_header';
import '../style/css/font-awesome.css';
import {
    selectNode,
    updatePosition,
    dragLines,
    updateAnchor,
    deleteNode,
    editNode,
    saveNode,
    zoomMap,
    connectNode,
    createConnection,
    toggleDisplay
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
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);

        this.state = {editorState: EditorState.createEmpty()}
    }

    getPosition() {
        var rect = this.node.getBoundingClientRect();
        var anchorPos = {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
        return {rect, anchorPos};
    }

    componentDidMount() {
        var position = this.getPosition();
        this.setState({
            rect: position.rect,
            editorState: EditorState.createWithContent(this.props.node.content),
            title: this.props.node.title
        });
        this.props.dragLines(this.props.id, position.anchorPos);
        this.props.updateAnchor(this.props.id, position.anchorPos);
    }

    handleStart(e) {
        var position = this.getPosition();
        this.props.updatePosition(this.props.id, position.rect);
        this.props.updateAnchor(this.props.id, position.anchorPos);
        this.props.dragLines(this.props.id, position.anchorPos);
    }

    handleDrag(e) {
        var position = this.getPosition();
        this.props.updatePosition(this.props.id, position.rect);
        this.props.updateAnchor(this.props.id, position.anchorPos);
        this.props.dragLines(this.props.id, position.anchorPos);
    }

    handleStop(e) {
        var position = this.getPosition();
        this.props.updatePosition(this.props.id, position.rect);
        this.props.updateAnchor(this.props.id, position.anchorPos);
    }

    onTitleEdit(title) {
        this.setState({title: title});
    }

    editNode() {
        if (!this.props.node.display) {
            this.props.toggleDisplay(this.props.node.id);
        }
        this.props.editNode(this.props.id);
    }

    saveNode() {
        this.props.saveNode(this.props.id, this.state.title, this.state.editorState.getCurrentContent());
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

    handleClick() {
        if (this.props.connect.active) {
            this.props.createConnection(this.props.connect.node, this.props.node);
        }
        this.props.connectNode(null, null);
    }

    toggleDisplay() {
        this.props.toggleDisplay(this.props.node.id);
        setTimeout(() => {
            this.props.updateAnchor(this.props.node.id, this.getPosition().anchorPos);
            this.props.dragLines(this.props.node.id, this.getPosition().anchorPos);
            this.props.updatePosition(this.props.id, this.getPosition().rect);
        }, 1);

    }

    onEditorChange(editorState) {
        this.setState({editorState});
    }

    render() {
        var selectedId;
        if (this.props.selected) {
            selectedId = this.props.selected.id;
        } else {
            selectedId = 0;
        }
        var handleClass = (!this.props.node.edit ? "node-container handle" : "node-container");
        var selectedClass = (selectedId === this.props.id ? "selected node" : "node");
        return (
            <Draggable
                position={this.props.node.position}
                onStart={(e) => {this.handleStart(e)}}
                onDrag={(e) => {debounce(this.handleDrag(e), 5, true)}}
                onStop={(e) => {this.handleStop(e)}}
                handle=".handle"
                axis={this.props.node.edit ? "none" : "both"}
                onMouseDown={(e) => {this.props.selectNode(this.props.node);}}
                >
                <div
                    className={handleClass}
                    style={(selectedId === this.props.id) ? {zIndex: 100} : {zIndex: 0}}
                    onWheel={this.props.handleWheel}
                    onMouseMove={this.props.handleMove}>
                    <div
                        ref={(node) => {this.node = node}}
                        onClick={(e) => {this.handleClick()}}
                        className={selectedClass}
                        style={this.props.style}>
                        {this.props.node.edit ?
                            <div>
                                <EditNode
                                title={this.props.node.title}
                                onTitleEdit={this.onTitleEdit}
                                saveNode={this.saveNode}/>
                            </div> :
                            <NodeHeader title={this.props.node.title} handleClick={this.toggleDisplay} display={this.props.node.display}/>
                        }
                        {this.props.node.display ?
                            <NodeEditor
                                onEditorChange={this.onEditorChange}
                                editorState={this.state.editorState}
                                edit={this.props.node.edit} /> : null }

                    </div>
                    { (selectedId === this.props.id) ?
                        <NodeControls
                            edit={this.props.node.edit}
                            editNode={this.editNode}
                            delete={this.deleteNode}
                            cancel={(e) => this.handleCancel()}
                            saveNode={this.saveNode}
                            connectNode={this.props.connectNode}
                            node={this.props.node} /> : null}
                </div>
            </Draggable>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectNode,
        updatePosition,
        dragLines,
        updateAnchor,
        deleteNode,
        editNode,
        saveNode,
        zoomMap,
        connectNode,
        createConnection,
        toggleDisplay
    }, dispatch);
}

function mapStateToProps(state) {
    // should use an object as global state. with ids as keys.
    return {selected: state.Selected, connect: state.connect} // messing with this atm...
}

export default connect(mapStateToProps, mapDispatchToProps)(Node);
