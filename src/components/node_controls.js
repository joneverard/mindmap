import React, { Component } from 'react';


class NodeControls extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        var classList = (this.props.selected === this.props.nodeId) ? "node-controls fade-in" : "node-controls hide fade-out";
        return (
            <div className={classList}>
                <button type="submit" onClick={this.props.editNode}>edit</button>
                <button type="submit" onClick={this.props.delete}>delete</button>
            </div>
        )
    }
}

export default NodeControls;