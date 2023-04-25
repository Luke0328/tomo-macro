import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json();
        if(data.status === 'ok'){
            console.log('frontend: successfully logged in ');
            navigate('Home');
        }
        else{
            alert('Invalid email or password!');
        }
        // console.log(email);
    }

    const handleSwap = () => {
        navigate('/Register');
    }

    return (
        <>
        {/* <h1>Welcome to TomoMacro!</h1> */}
        <div className="flex flex-col w-2/5 h-2/5 rounded items-center bg-white shadow-xl p-5"> 
            <h1 className="text-4xl">Welcome to TomoMacro!</h1>
            <form className="w-full flex flex-col justify-center items-center h-full" id="login" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">Email</label> */}
            
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" className="w-4/5 h-full focus:outline-none border-b-2 focus:border-rose-600 text-lg"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" name="password" className="w-4/5 h-full focus:outline-none border-b-2 focus:border-rose-600 text-lg"/>
                </div>

                <div className="flex justify-around items-center w-4/5 h-full">
                    <button type="submit" form="login" className="border-solid border-black border-2 w-full m-3 h-3/5 rounded-md text-xl bg-rose-500 text-white">Login</button>
                    <button onClick={handleSwap} className="border-solid border-black border-2 w-full h-3/5 m-3 rounded-md text-xl">Register</button>
                </div>
                {/* <span className="w-full text-right mr-20 text-xs">Forgot your password?</span> */}
{/* 
                <div className="flex flex-col align-center w-4/5 h-1/5">
                    <div className="flex justify-center">Or</div>
                    <button>Sign up with Google</button>
                </div> */}
            </form>
        </div>
        </>
    );
}

export default Login;