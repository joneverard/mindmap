import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Node from '../components/node';
import MapView from '../components/map';

class MindMap extends Component {
    constructor(props) {
        super(props);
        this.state = '';
        this.renderNode = this.renderNode.bind(this);
    }

    renderNode(node) {
        let styleProps = {
            backgroundColor: node.color
        }
        return (
            <Node
                title={node.title}
                style={styleProps}
                position={node.position}
                id={node.id}
                key={node.id}
                />
        )
    }

    render() {
        return (
            <div className="main">
                {this.props.nodes.map(this.renderNode)}
                <MapView />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initial: state.initial,
        nodes: state.Nodes,
        connections: state.Connections
    };
}

// pass in the initial state into a node component next!
// <h1 className="initial-text">{this.props.nodes[0].title}</h1>
export default connect(mapStateToProps)(MindMap);