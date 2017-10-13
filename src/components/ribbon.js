import React, { Component } from 'react';
import '../style/skeleton.css';
import '../style/normalize.css';
import '../style/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createNode } from '../actions';
// will need to connect this to an action creator at some point.
// import action from '../blahhhh actions.index.js'

class Ribbon extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        return (
            <div className="ribbon">
                <button
                className="button-primary create-btn"
                onClick={() => {this.props.createNode()}}>
                +
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createNode}, dispatch);
}


export default connect(null, mapDispatchToProps)(Ribbon);