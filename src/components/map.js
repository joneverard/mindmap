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
        var svg = select('svg')
        svg.attr('height', this.state.height)
           .attr('width', this.state.width);
        svg.append('g')
            .attr('class', 'links')
            .attr('stroke', '#333')
        this.renderMap();
        // this.dosomething();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleDrag(d, i) {
        var data = [...this.props.connections];
        data[i] = {x: [d.x[0]+=event.dx, d.x[1]+=event.dx], y:[d.y[0]+=event.dy, d.y[1]+=event.dy]}
        this.setState({data: data});
    }

    componentDidUpdate() {
        this.renderMap();
    }

    renderMap() {
        // console.log(this.props.connections);
        var mapConnections = select('g')
                .selectAll('line')
                .data(this.props.connections, function(d) {
                    return d
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
                    .attr('x1', 250)
                    .attr('y1', 250)
                    .attr('x2', function(d) {
                        return d.end.position.x;
                    })
                    .attr('y2', function(d) {
                        return d.end.position.y;
                    })
                    .attr('stroke-width', 5)

                    .merge(mapConnections);
            // console.log(mapConnections)
    }

    updateD3Data() {
      // .call(drag().on('start', function(e, i) {
      //   console.log(e, i);
      // })
      // .on('drag', (d, i) => this.handleDrag(d, i)));
  };

    render() {
        return (
            <svg height={this.state.height} width={this.state.width}></svg>
        )
    }
}

function mapStateToProps(state) {
    return {
        connections: state.Connections
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({})
// }

export default connect(mapStateToProps)(MapView)




        // var mapConnections = select('g')
        //         .selectAll('line')
        //         .data(this.state.data, function(d) {
        //             return d.x
        //         });

        // mapConnections
        //     .exit()
        //     .remove();

        // mapConnections
        // .enter()
        // .append("line")
        //   .attr('x1', function(d) {
        //     return d.x[0];
        //   })
        //   .attr('x2', function(d) {
        //     return d.x[1];
        //   })
        //   .attr('y1', function(d) {
        //     return d.y[0];
        //   })
        //   .attr('y2', function(d) {
        //     return d.y[1];
        //   })
        //   .attr("stroke-width", 5)

        // .merge(mapConnections)
        //   .call(drag().on('start', function(d, i)  {
        //     console.log(d, i);
        //   })
        //   .on('drag', (d, i) => this.handleDrag(d, i)))