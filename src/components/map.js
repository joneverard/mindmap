import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { drag, select, event } from 'd3';


class MapView extends Component {
    constructor(props) {
      super(props);
    var data = [
        {x: [100,200], y:[300,500]},
        {x: [100,300], y:[250,600]}
    ]
        this.state = { width: '0', height: '0', data: data };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.dosomething();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleDrag(d, i) {
        var data = [...this.state.data];
        data[i] = {x: [d.x[0]+=event.dx, d.x[1]+=event.dx], y:[d.y[0]+=event.dy, d.y[1]+=event.dy]}
        this.setState({data: data});
        this.dosomething();
    }

    dosomething() {
    var svg = select("svg")
    svg.attr('height', this.state.height)
        .attr('width', this.state.width)

    var link = svg.append("g")
      .attr("class", "links")
      .attr('stroke', 'black')
    .selectAll("line")
    .data(this.state.data)
    .enter()
    .append("line")
      .attr('x1', function(d) {
        return d.x[0];
      })
      .attr('x2', function(d) {
        return d.x[1];
      })
      .attr('y1', function(d) {
        return d.y[0];
      })
      .attr('y2', function(d) {
        return d.y[1];
      })
      .attr("stroke-width", 5)
      .call(drag().on('start', function(e, i) {
        console.log(e, i);
      })
      .on('drag', (d, i) => this.handleDrag(d, i)));
  };

    render() {
        return (
            <svg height={this.state.height} width={this.state.width}></svg>
        )
    }
}

function mapStateToProps(state) {
    return {
        connections: state.connections
    }
}

export default connect(mapStateToProps)(MapView)