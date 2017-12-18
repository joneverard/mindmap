import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { select } from 'd3';
import { selectNode, editNode, zoomMap, panMap, connectNode } from '../actions';
import Connection from './connection';

class MapView extends Component {
    constructor(props) {
      super(props);
        this.state = { width: '0', height: '0', mouse: {x: 0, y: 0}};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.renderLine = this.renderLine.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        var svg = select('svg')
        svg.attr('height', this.state.height)
           .attr('width', this.state.width);
        svg.append('g')
            .attr('class', 'links')
            .attr('stroke', '#3F3F3F')
        // this.renderMap();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidUpdate() {
        // this.renderMap();
        this.renderLine();
    }

    cancelSelection(e) {
        this.props.selectNode(null);
        this.props.editNode(null);
        this.props.connectNode(null, null);
    }

    renderMap() {
        var mapConnections = select('g')
                .selectAll('line')
                .data(this.props.connections, function(d) {
                    return d
                })
                .attr('x1', function(d) {
                    return d.start.position.x;
                })
                .attr('y1', function(d) {
                    return d.start.position.y;
                })
                .attr('x2', function(d) {
                    return d.end.position.x;
                })
                .attr('y2', function(d) {
                    return d.end.position.y;
                })
                .attr('id', function(d) {
                    return Math.random()*1000000;
                })

            mapConnections
                .exit()
                .remove();

            mapConnections
                .enter()
                .append('line')
                    .attr('x1', function(d) {
                        return d.start.position.x;
                    })
                    .attr('y1', function(d) {
                        return d.start.position.y;
                    })
                    .attr('x2', function(d) {
                        return d.end.position.x;
                    })
                    .attr('y2', function(d) {
                        return d.end.position.y;
                    })
                    .attr('id', function(d) {
                        return Math.random()*1000000
                    })
                    .attr('stroke-width', 2)
                    .merge(mapConnections);
    };

    handlePan(e, start) {
        this.setState({startPos: {x: e.clientX, y: e.clientY}, pan: start});
    }

    handleMove(e) {
        this.props.handleMove(e);
        if (this.state.pan) {
            var newPos = {x: e.clientX, y: e.clientY}
            this.props.panMap(this.state.startPos, newPos);
            this.setState({startPos: newPos})
        }
    }

    renderLine(conn) {
        if (conn) {
            return (<Connection conn={conn} key={conn.id} />); // this needs a key and an id.
        }
    }

    render() {
        // console.log(this.props.children)
        return (
            <svg
                height={this.state.height}
                width={this.state.width}
                onWheel={this.props.handleWheel}
                onClick={(e) => this.cancelSelection(e)}
                onMouseMove={(e) => {this.handleMove(e)}}
                ref={svg => this.svg = svg}
                // onMouseDown={(e) => {this.handlePan(e, true)}}
                // onMouseUp={(e) => {this.handlePan(e, false)}}
                >
                {this.props.connections.map(this.renderLine)}
                </svg>
        )
    }
}

function mapStateToProps(state) {
    return {
        connections: state.Connections
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectNode, editNode, zoomMap, panMap, connectNode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
