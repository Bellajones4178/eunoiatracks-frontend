import React from 'react'; 
import { Link } from 'react-router-dom'; 
 
function Home()
{
    return (
        <div className="landing-background">
        <div className="form-tables">
        <div>
            <main>
                <h1>Eunoia</h1>
                <h2>Welcome to Eunoia!</h2>
                <Link to="/login"><button>Log in</button></Link>
                <Link to="/register"><button>Register</button></Link>
                <h3>Streamline Your Grants.</h3>
                <h4>Enter your grant details.</h4>
                <h4>Upload your documents.</h4>
                <h4>Track your progress.</h4>
                <h4>Simplify your grant.</h4>
            </main>
        </div>
        </div>
        </div>
            
    );
}

export default Home;