import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import d3 from 'd3';

export default class Connections extends Component {
    constructor(props) {
        super(props)
        this.state = {'123': {
            x1: 150,
            x2: 250,
            y1: 175,
            y2: 370
        }};
    };


}