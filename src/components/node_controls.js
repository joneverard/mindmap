import React, { Component } from 'react';


class NodeControls extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        // var classList = (this.props.selected === this.props.nodeId) ? "node-controls fade-in" : "node-controls hide fade-out";
        var classList = "node-controls fade-in"
        if (this.props.edit) {
            return (
                <div className={classList}>
                    <button type="submit" className="save-btn">Save</button>
                    <button type="submit">Cancel</button>
                </div>
            )
        } else {
            return (
                <div className={classList}>
                    <button type="submit" onClick={this.props.editNode}>Edit</button>
                    <button type="submit" onClick={this.props.delete}>Delete</button>
                </div>
            )
        }
    }
}

export default NodeControls;