// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    useEffect(() => {
        fetch("http://localhost:8000/logout")
          .then((res) => res.json())
          .then((data) => {
              setIsLoggedIn(data.success);
            //   console.log(data.message);
          })
          .catch((error) => {
              console.error("Error logging out:", error);
          });
      }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        fetch("http://localhost:8000/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ success : true }), // Send message in the request body
        })
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: `#440455` }}>
                <div className="container">
                    <a className="navbar-brand" href='/'>ChAAD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ms-auto">
                            <li className="navitem">
                                {isLoggedIn ? (
                                    <div>
                                    <Link to='/profile' className='btn btn-warning' style={{ borderRadius: `10px`, marginLeft: '10px' }}>
                                        <span className='align-middle p-2' style={{ fontWeight: `500` }}>PROFILE</span>
                                    </Link>
                                    <Link to='/' onClick={handleLogout} className='btn btn-danger' style={{ borderRadius: `10px`, marginLeft: '10px' }}>
                                        <span className='align-middle p-2 text-white' style={{ fontWeight: `500` }}>LOGOUT</span>
                                    </Link>
                                    </div>
                                ) : (
                                    <div>
                                    <Link to='/' className='text-decoration-none'>
                                        <span className='align-middle p-4 text-white'>HOME</span>
                                    </Link>
                                    <Link to='/login' className='btn btn-warning' role="button" style={{ borderRadius: `10px`, marginLeft: '10px' }}>
                                        <span className='align-middle p-2 text-dark' style={{ fontWeight: `500` }}>LOGIN</span>
                                    </Link>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
