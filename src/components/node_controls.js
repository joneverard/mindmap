import React, { Component } from 'react';


class NodeControls extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        var classList = (this.props.selected === this.props.nodeId) ? "node-controls" : "node-controls hide";
        return (
            <div className={classList}>
                <button type="submit">edit</button>
                <button type="submit">delete</button>
            </div>
        )
    }
}

export default NodeControls;