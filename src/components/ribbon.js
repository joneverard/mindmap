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
        this.state = {title: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createNode(this.state.title);
    }

    onInputChange(title) {
        this.setState({title: title});
        console.log(this.state);
    }

    render() {
        return (
            <div className="ribbon">
                <form onSubmit={(e) => {this.handleSubmit(e)}}>
                    <button
                        type="submit"
                        className="create-btn"
                        >
                    +
                    </button>
                    <input
                        type="text"
                        className="title-box"
                        placeholder="enter a node title"
                        onChange={(e) => this.onInputChange(e.target.value)}
                        >

                    </input>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createNode}, dispatch);
}


export default connect(null, mapDispatchToProps)(Ribbon);

                        // onClick={() => {this.props.createNode()}}>