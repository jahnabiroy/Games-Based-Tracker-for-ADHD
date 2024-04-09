// import React, { useState } from 'react';
// import './login.css'; // Import CSS file for styling

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Perform authentication logic here (e.g., sending credentials to server)
//     // For simplicity, here we're just checking if username and password are not empty
//     if (username !== '' && password !== '') {
//       setLoggedIn(true);
//     } else {
//       alert('Please enter username and password');
//     }
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setUsername('');
//     setPassword('');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         {loggedIn ? (
//           <div>
//             <h1>Welcome, {username}!</h1>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           <form onSubmit={handleLogin}>
//             <label>
//               Username:
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </label>
//             <br />
//             <label>
//               Password:
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>
//             <br />
//             <button type="submit">Login</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

import { 
    Link  
  }   
  from 'react-router-dom';
import bkg from '../assets/adhdback.png'
import { useState } from 'react';
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
    }

    return(
        <>
        <div className="container-fluid" style={{backgroundImage: `url(${bkg})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center-bottom`, backgroundSize: `cover`}}>
            <div className="row p-5">
                <div className="col-md-4"></div>
                <div className="col-md-4 my-5" style={{border: `1px solid #fff`, borderRadius: `10px`, background: `transparent`, backdropFilter: `blur(10px)`}}>
                    <h2 className="text-center text-white p-4 pt-5">Login</h2>
                    <form onSubmit={handleSubmit}>
                    <input className='form-control' type="username" placeholder="Username" required style={{borderRadius: `15px`, padding: `10px`, border:`0px`, margin: `3px`, width: `100%`}} onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <input className='form-control' type="password" placeholder="Password" required style={{borderRadius: `15px`, padding: `10px`, border:`0px`, margin: `3px`, width: `100%`}} onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <Link to='/training' className='btn btn-warning' role="button" data-bs-toggle="button" style={{borderRadius: `15px`, justifyContent: `center`, alignItems: `center`, display: `flex`, margin: `3px`}}>
                        <span className='align-middle px-2 py-1 text-dark' style={{fontWeight: `bolder`}}>LOGIN</span>
                    </Link>
                    <br/>
                    <h6 className='text-white text-center'>Don't have an account?
                        <Link to='/register' style={{textDecoration: `none`, color: `white`, paddingLeft: `5px`, fontWeight: `bolder`}}>Register here</Link>
                    </h6>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
        </>
    )
}

export default Login