import React, { Component } from 'react';

export default function(props) {
    return (
        <div className="node" style={props.style}>
            <h5>{props.title}</h5>
        </div>
    )
}