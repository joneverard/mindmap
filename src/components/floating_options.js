import React, { Component } from 'react';

class FloatingOptions extends Component {

    render() {
        if (this.props.position) {
            var positionStyle = {left: this.props.position.x, top: this.props.position.y};
        } else {
            var positionStyle = {};
        }
        if (this.props.show) {
            return (
                <div className="floating-option" style={positionStyle}>
                    <button onClick={(e) => this.props.delete(e)}>delete</button>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default FloatingOptions;


// style={{left: this.props.position.x, top: this.props.position.y}}