import React from "react";
import adhd from '../assets/adhdback.png'
import { Link } from "react-router-dom";

function Landing() {
    return(
        <div>
            <div className='container-fluid' style={{backgroundColor: `#440455`}}>
                <div className="row">
                    <h1 className="text-white text-center mt-5" style={{fontSize: `4em`, textShadow: `0 0 7px #fff`}}>GAME BASED TRACKER FOR</h1>
                    <h1 className='text-white text-center' style={{fontSize:`10rem`, textShadow: `0 0 7px #fff`}}>🦋ADHD🦋</h1>
                    <h1 className="text-white text-center" style={{textShadow: `0 0 7px #fff`}}>Attention Deficit Hyperactive Disorder</h1>
                    <div className="col-md-4 lols p-3 pt-2 mt-5" style={{backgroundColor: `#ffc107`}}>
                        <span style={{fontSize: `4em`}}>🎮</span>
                        <div style={{fontSize: `2em`, textShadow:`0 0 1px #000`}}>Play Games and Score!</div>
                        <div style={{fontSize: `1.5em`}}>Challenge yourself to games and develop your skills.</div>
                    </div>
                    <div className="col-md-4 p-3 pt-2 lols mt-5" style={{ backgroundColor: `#e8b95b`}}>
                        <span style={{fontSize: `4em`}}>🏆</span>
                        <div style={{fontSize: `2em`, textShadow:`0 0 1px #000`}}>Win in Games and Life!</div>
                        <div style={{fontSize: `1.5em`}}>Watch your scores skyrocket and your attitude change!</div>
                    </div>
                    <div className="col-md-4 mt-5 p-3 pt-2" style={{backgroundColor: `#ebc16d`}}>
                        <span style={{fontSize: `4em`}}>📈</span>
                        <div style={{fontSize: `2em`, textShadow:`0 0 1px #000`}}>Note your Progress!</div>
                        <div style={{fontSize: `1.5em`}}>Be proud of how far you have come along!</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 text-center">
                        <Link to='/login' className="btn btn-light btn-lg m-5" style={{fontWeight: `700`}}> GET STARTED</Link>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    );
}

export default Landing;