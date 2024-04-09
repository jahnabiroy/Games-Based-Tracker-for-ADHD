import './App.css'
import { 
    Link  
  }   
  from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: `#64057e`, boxShadow: `0 2px 4px rgba(0,0,0,0.25)` }}>
                <div className="container">
                    <a className="navbar-brand">ChAAD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ms-auto">
                            <li className="navitem">
                                <Link to='/' className='text-decoration-none'>
                                    <span className='align-middle p-4 text-white'>HOME</span>
                                </Link>
                                <Link to='/login' className='btn btn-warning' role="button" data-bs-toggle="button"  style={{borderRadius: `10px`}}>
                                    <span className='align-middle p-2 text-dark' style={{fontWeight: `500`}}>LOGIN</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar