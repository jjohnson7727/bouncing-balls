import React, { Component } from 'react';
import Animation from './Animation';
import './Canvas.css';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.animation = new Animation()
                                .width(this.props.width)
                                .height(this.props.height)
                                .callback(props.callback)
                                .balls(props.balls);
    }

    componentDidMount() {
        this.animation.context(this.pallet()).initialize();
    }

    componentDidUpdate(prevProps) {
        if(this.isStartup(prevProps)) this.animation.start();
        else if(this.isShutdown(prevProps)) this.animation.stop();
    }

    isShutdown(prevProps) {
        return this.props.running === false && prevProps.running === true;
    }

    isStartup(prevProps) {
        return this.props.running === true && prevProps.running === false;
    }

    pallet() {
        return this.canvas.current.getContext('2d');
    }

    render() {
        return (
            <div className='Canvas'>
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