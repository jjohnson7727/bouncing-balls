import React, { Component } from 'react';
import Animation from './Animation';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.animation = new Animation().width(this.props.width).height(this.props.height);
    }

    componentDidMount() {
        this.animation.context(this.pallet())
                        .preLaunch()
                        .loop();
    }

    pallet() {
        return this.canvas.current.getContext('2d');
    }

    render() {
        return (
            <div className="Canvas">
                <canvas ref={this.canvas} width={this.props.width} height={this.props.height}></canvas>
            </div>
        );
    }
}

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
}

export default Canvas;