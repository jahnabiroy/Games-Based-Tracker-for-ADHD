import './training.css'
export default function Training() {
    return(
    <div>
        <div className="container-fluid" style={{backgroundColor: `#440455`}}>
            <div className='row'><div className='text-white text-center' style={{fontSize: `3em`}}>TRAINING CENTER</div></div>
            <div className="row pt-5">
                <div className="col-md-1"></div>
                <div className="col-md-5 turns" style={{backgroundColor: `#ffc107`}}>hello</div>
                <div className="col-md-5 turns" style={{backgroundColor: `purple`}}>bitches</div>
            </div>
            <div className="row pb-5">
                <div className="col-md-1"></div>
                <div className="col-md-5 turns" style={{backgroundColor: `purple`}}>hello</div>
                <div className="col-md-5 turns" style={{backgroundColor: `#ffc107`}}>bitches</div>
            </div>
        </div>
    </div>
    );
}