import React, { Component } from 'react';


class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    render() {
        return (
            <g>
            <SVGLine
                conn={this.props.conn}
                lineWidth={10}
                colour="grey"
                />
            <SVGLine
                conn={this.props.conn}
                lineWidth={2}
                colour="black"
                />
            </g>
        )
    }
}

export function SVGLine(props) {
    return (
        <line
            x1={props.conn.start.position.x}
            x2={props.conn.end.position.x}
            y1={props.conn.start.position.y}
            y2={props.conn.end.position.y}
            strokeWidth={props.lineWidth}
            stroke={props.colour}
            zIndex={1000} />
    )
}

export default Connection;