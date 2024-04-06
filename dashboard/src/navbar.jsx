import './App.css'
import { 
    Link  
  }   
  from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: `#FFFFFF1A`}}>
                <div className="container d-flex">
                    <a className="navbar-brand" href="#">ChAAD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link to='/' className='text-decoration-none text-black'>
                                home
                            </Link>
                            </li>
                            <Link to='/game' className='text-decoration-none text-black'>
                                game
                            </Link>
                        </ul>
                    </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar