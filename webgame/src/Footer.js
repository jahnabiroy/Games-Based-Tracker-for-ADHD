export default function Footer() {
    return (
        <div>
            <div className="container-fluid" style={{backgroundColor: `#440455`}}>
                <div className="row text-white">
                    <div className="col-md-2 m-3" style={{fontSize: `2.5em`}}>ChAAD</div>
                    <div className="col-md-6 m-3">
                        <div className='mt-2' style={{fontSize: `1.5em`}}>Children and Adults with ADHD</div>
                        <div style={{fontSize: `0.85em`, color: `rgb(167, 164, 164)`}}>The medical contents of the website have been derived from trusted medical advisory websites.
                            The website in no way is a direct diagnosis of the medical condition. It is just an indicator,
                            tracking your mental health as you play the games. It is advised to see a doctor before taking 
                            any medications on your own. Mental Health is a serious issue.
                        </div>
                    </div>
                    <div className="col-md-3 m-3 mt-5 ms-auto" style={{fontSize: `1.25em`}}>
                        Made by Jahnabi Roy and Abhinav Rajesh Shripad <span style={{fontSize: `1.3em`}}>❤︎</span>
                    </div>
                </div>
            </div>
        </div>
    )
}