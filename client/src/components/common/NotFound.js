import React from 'react';
import {IndexLink, Link} from 'react-router';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            droidX: 0,
            mouseX: 0,
            toTheRight: true,
            speed: 1,
            accelMod: 1
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.movement = this.movement.bind(this);
    }
    // Get some initial movement on first mount.
    componentWillMount() {
        this.setState({mouseX: 643});
    }
    // Set up the mouse event listener and fire up the movement function.
    componentDidMount() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        setInterval(this.movement.bind(this), 1);
    }
    // Clean up.
    componentWillUnmount() {
        document.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    // Keep track of the mouse position.
    handleMouseMove(event) {
        this.setState({mouseX: event.pageX})
    }
    //Get Moving
    movement() {
        let {droidX, mouseX, speed, accelMod} = this.state;
        if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
            let distance = mouseX - droidX;
            let accleration = Math.abs(distance * accelMod) / 100;

            if (droidX < mouseX) {
                this.setState({
                    droidX: droidX + (speed * accleration),
                    toTheRight: true
                });
            } else {
                this.setState({
                    droidX: droidX - (speed * accleration),
                    toTheRight: false
                });
            }

        }
    }

    render() {
        let {droidX, mouseX, toTheRight} = this.state;
        return (
            <div className="notfound">
                <nav className="navbar navbar-light">
                    <img src={require('../../assets/img/logo.svg')} className="brand-img" alt=""/>
                    <IndexLink to="/" className="navbar-brand ">Docstash</IndexLink>
                </nav>
                <h1 className="notfound_h1">Oops Page Not Found..!!!</h1>
                <p className="notfound_p">4 4</p>
                <p className="notfound_pm">404</p>
                <div>
                    <div className="bb8" style={{
                        WebkitTransform: `translateX(${droidX}px)`
                    }}>
                        <div className={'antennas ' + (toTheRight
                            ? 'right'
                            : '')} style={{
                            WebkitTransform: `translateX(${ (mouseX - droidX) / 25}px) rotateZ(${ (mouseX - droidX) / 80}deg)`
                        }}>
                            <div className="antenna short"></div>
                            <div className="antenna long"></div>
                        </div>
                        <div className="head" style={{
                            WebkitTransform: `translateX(${ (mouseX - droidX) / 15}px) rotateZ(${ (mouseX - droidX) / 25}deg)`
                        }}>
                            <div className="stripe one"></div>
                            <div className="stripe two"></div>
                            <div className={'eyes ' + (toTheRight
                                ? 'right'
                                : '')}>
                                <div className="eye one"></div>
                                <div className="eye two"></div>
                            </div>
                            <div className={'stripe detail ' + (toTheRight
                                ? 'right'
                                : '')}>
                                <div className="detail zero"></div>
                                <div className="detail zero"></div>
                                <div className="detail one"></div>
                                <div className="detail two"></div>
                                <div className="detail three"></div>
                                <div className="detail four"></div>
                                <div className="detail five"></div>
                                <div className="detail five"></div>
                            </div>
                            <div className="stripe three"></div>
                        </div>
                        <div className="ball" style={{
                            WebkitTransform: `rotateZ(${droidX / 2}deg)`
                        }}>
                            <div className="lines one"></div>
                            <div className="lines two"></div>
                            <div className="ring one"></div>
                            <div className="ring two"></div>
                            <div className="ring three"></div>
                        </div>
                        <div className="shadow"></div>
                    </div>
                </div>
                <Link to="/" className="button notfound_btn">Back to Home</Link>
            </div>
        );
    }
}
export default NotFound;
