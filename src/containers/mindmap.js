import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Node from '../components/node';

class MindMap extends Component {
    constructor(props) {
        super(props);
        this.state = '';
        this.renderNode = this.renderNode.bind(this);
    }

    componentDidMount() {

    }

    renderNode(node) {
        let styleProps = {
            backgroundColor: node.color,
            left: node.position[0],
            top: node.position[1],
        }
        return (
            <Node
                title={node.title}
                style={styleProps}
                key={node.id}
                />
        )
    }

    render() {
        return (
            <div className="main">
                {this.props.nodes.map(this.renderNode)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initial: state.initial,
        nodes: state.Nodes
    };
}

// pass in the initial state into a node component next!
// <h1 className="initial-text">{this.props.nodes[0].title}</h1>
export default connect(mapStateToProps)(MindMap);