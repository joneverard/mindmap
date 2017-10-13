import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MindMap extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        return (
            <div className="main">
                <h1 className="initial-text">Hello there!</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {initial: state.initial};
}

export default connect(mapStateToProps)(MindMap);