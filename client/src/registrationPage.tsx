import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSwap = () => {
        navigate('/');
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handling registration for ' + firstName);
    }


    return (
        <div className="flex flex-col w-2/5 h-2/5 rounded border-2 border-solid border-black items-center"> 
            <h3>Start your fitness journey with TomoMacro</h3>
            <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">Email</label> */}
            
                <div className="flex flex-col justify-center items-center w-full">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" className="w-4/5"/>
                    <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name..." id="firstName" name="firstName" className="w-2/5"/>
                    <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name..." id="lastName" name="lastName" className="w-2/5"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" name="password" className="w-4/5"/>
                </div>

                <div className="flex flex-col w-full">
                    <button>Register</button>
                    <div className="flex justify-center">Or already have an account?</div>
                    <button onClick={handleSwap}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Register;