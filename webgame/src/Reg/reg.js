import React, { useState } from "react";
import bkg from '../assets/adhdback.png'
import { Link } from "react-router-dom";
import './reg.css'

export default function Reg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const registerUser = () => {
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password, age : age }), // Send both username and password in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Response from server:", data);
        setMessage(data.message);
        if (data.message === "User Registered Successfully!") {
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleReg = () => {
    // Add your condition here
    if (redirect) {
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <div className="container-fluid" style={{ backgroundImage: `url(${bkg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center bottom', backgroundSize: 'cover' }}>
            <div className="row p-5">
                <div className="col-md-4"></div>
                    <div className="col-md-4 my-5" style={{ border: '1px solid #fff', borderRadius: '10px', background: 'transparent', backdropFilter: 'blur(15px)' }}>
                        <h2 className="text-center text-white p-4 pt-5" style={{fontWeight: `700`}}>Register</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                style={{ borderRadius: '15px', padding: '10px', border: '0px', margin: '3px', width: '100%' }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br/>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                style={{ borderRadius: '15px', padding: '10px', border: '0px', margin: '3px', width: '100%' }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <input
                              type="number"
                              placeholder="Age"
                              value={age}
                              style={{ borderRadius: '15px', padding: '10px', border: '0px', margin: '3px', width: '100%' }}
                              onChange={(e) => setAge(e.target.value)}
                            />
                            <button onClick={() => { registerUser(); handleReg()}} className={`btn ${redirect ? 'btn-success' : 'btn-warning'} ${redirect ? 'text-white' : 'text-dark'} fw-bold`} style={{ borderRadius: '15px', justifyContent: 'center', alignItems: 'center', display: 'flex', margin: '3px', width: '100%'}}>
                                {redirect ? 'LOGIN' : 'REGISTER'}
                            </button>
                            <br />
                            <h6 className='text-white text-center'>Already have an account?
                                <Link to='/login' style={{ textDecoration: 'none', color: 'white', paddingLeft: '5px', fontWeight: 'bolder' }}>Login here</Link>
                            </h6>
                            <h5 className={`${redirect ? 'text-green' : 'text-maroon'} text-center`} style={{backgroundColor: `#ffc107` , padding: `2px`, borderRadius : `8px`, fontWeight: `600`, marginTop: `3px`, fontFamily: `monospace`}}>{message}</h5>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <br/>
            </div>
    </div>
  );
}
