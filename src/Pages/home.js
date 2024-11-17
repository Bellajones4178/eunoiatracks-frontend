import React from 'react'; 
import { Link } from 'react-router-dom'; 
 
function Home()
{
    return (
        <div className="landing-background">
        <div className="form-tables">
        <div>
            <main className='homecenter'>
                <h1>Eunoia</h1>
                <br></br>
                <h2>Welcome to Eunoia!</h2>
                <br></br>
                <Link to="/login"><button className='home-button'>Log in</button></Link>
                <Link to="/register"><button className='home-button'>Register</button></Link>
                <br></br>
                <br></br>
                <h3>Streamline Your Grants.</h3>
                <br></br>
                <h4>Enter your grant details.</h4>
                <br></br>
                <h4>Upload your documents.</h4>
                <br></br>
                <h4>Track your progress.</h4>
                <br></br>
                <h4>Simplify your grant.</h4>
            </main>
        </div>
        </div>
        </div>
            
    );
}

export default Home;