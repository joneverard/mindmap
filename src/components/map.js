import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { select, event } from 'd3';
import { zoom } from 'd3-zoom';
import { selectNode, editNode } from '../actions';


class MapView extends Component {
    constructor(props) {
      super(props);
        this.state = { width: '0', height: '0', mouse: {x: 0, y: 0}};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        var svg = select('svg')
        svg.attr('height', this.state.height)
           .attr('width', this.state.width);
           // .attr('z-index', -1000)
        svg.append('g')
            .attr('class', 'links')
            .attr('stroke', '#3F3F3F')
        this.renderMap();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidUpdate() {
        this.renderMap();
    }

    cancelSelection(e) {
        this.props.selectNode(null);
        this.props.editNode(null);
    }

    handleWheel(e)  {
        console.log('hello');
        // console.log(e);
        console.log(e.deltaY);
        console.log(this.state.mouse.x)
    }

    handleMove(e) {
        this.setState({mouse:{x: e.clientX, y:e.clientY}})
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
                    .attr('stroke-width', 2)

                    .merge(mapConnections);
  };

    render() {
        return (
            <svg
                height={this.state.height}
                width={this.state.width}
                onClick={(e) => this.cancelSelection(e)}
                onWheel={(e) => this.handleWheel(e)}
                onMouseMove={(e) => this.handleMove(e)}
                ></svg>
        )
    }
}

function mapStateToProps(state) {
    return {
        connections: state.Connections
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectNode, editNode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
