import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Node from '../components/node';
import MapView from '../components/map';
import { zoomMap } from '../actions';

class MindMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setState = this.setState.bind(this);
        this.renderNode = this.renderNode.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
    }

    renderNode(node) {
        let styleProps = {...this.props.style};
        styleProps.backgroundColor = node.color;
        return (
            <Node
                node={node}
                style={styleProps}
                id={node.id}
                key={node.id}
                handleWheel={this.handleWheel}
                handleMove={this.handleMove}
                // ref={node.id}
                // edit={node.edit}
                // anchor={node.anchor}
                // position={node.position}
                // title={node.title}
                // selected={node.selected}
                />
        )
    }

    handleWheel(e)  {
        this.props.zoomMap(this.state.mouse, e.deltaY);
    }

    handleMove(e) {
        this.setState({mouse:{x: e.clientX, y:e.clientY}})
    }

    render() {
        return (
            <div className="main">
                {this.props.nodes.map(this.renderNode)}
                <MapView handleWheel={this.handleWheel} handleMove={this.handleMove} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initial: state.initial,
        nodes: state.Nodes,
        connections: state.Connections,
        style: state.style
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({zoomMap}, dispatch);
}

// pass in the initial state into a node component next!
// <h1 className="initial-text">{this.props.nodes[0].title}</h1>
export default connect(mapStateToProps, mapDispatchToProps)(MindMap);