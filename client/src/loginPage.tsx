import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email);
    }

    const handleSwap = () => {
        navigate('/Register');
    }

    return (
        
        <div className="flex flex-col w-2/5 h-2/5 rounded border-2 border-solid border-black items-center"> 
            <h3>Welcome to TomoMacro!</h3>
            <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">Email</label> */}
            
                <div className="flex flex-col justify-center items-center w-full">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" className="w-4/5"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" name="password" className="w-4/5"/>
                </div>

                <div className="flex justify-around w-full">
                    <button>Login</button>
                    <button onClick={handleSwap}>Register</button>
                </div>
                <span className="w-full text-right mr-2">Forgot your password?</span>

                <div className="flex flex-col align-center w-4/5 h-1/5">
                    <div className="flex justify-center">Or</div>
                    <button>Sign up with Google</button>
                </div>
            </form>
        </div>
    );
}

export default Login;