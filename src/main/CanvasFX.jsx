import React, { Component } from 'react';

import './CanvasFX.css';
import Ballimation from './Ballimation';

class CanvasFX extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.ballimation = new Ballimation().width(window.innerWidth).height(window.innerHeight);
    }

    componentDidMount() {
        this.ballimation.context(this.ctx()).prelaunch().loop();
    }

    random(min, max) {
        var num = Math.floor(Math.random() * (max - min)) + min;
        return num;
    }

    ctx() {
        return this.canvas.current.getContext('2d');
    }

    render() {
        return (
            <div className="CanvasFX">
                <canvas ref={this.canvas} width={this.props.width} height={this.props.height}></canvas>
            </div>
        );
    }
}

CanvasFX.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
}

export default CanvasFX;