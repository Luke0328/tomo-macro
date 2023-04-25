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


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        })
        const data = await response.json();
        if(data.status === 'ok'){
            navigate('/');
        }else{
            alert('Error registering user! Perhaps you exist in the system already?')
        }
    }



    return (
        <div className="flex flex-col w-2/5 h-3/5 rounded items-center bg-white shadow-xl p-5"> 
            <h3 className="text-4xl">Register with TomoMacro!</h3>
            <form className="w-full flex flex-col justify-center items-center h-full" id="registration" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">Email</label> */}
            
                <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="flex justify-between w-4/5 h-full">
                        <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name..." id="firstName" name="firstName" className="w-full h-full mr-3 focus:outline-none border-b-2 focus:border-rose-600 text-lg"/>
                        <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name..." id="lastName" name="lastName" className="w-full h-full ml-3 focus:outline-none border-b-2 focus:border-rose-600 text-lg"/>
                    </div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" className="w-4/5 h-full focus:outline-none border-b-2 focus:border-rose-600 text-lg"/>

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" name="password" className="w-4/5 h-full focus:outline-none border-b-2 focus:border-rose-600 text-lg"/>
                </div>

                <div className="flex flex-col w-4/5 h-full items-center">
                    <button type="submit" form="registration" className="border-solid border-black border-2 w-full m-3 h-3/5 rounded-md text-xl bg-rose-500 text-white">Register</button>
                    <div className="flex justify-center text-sm">Already have an account?</div>
                    <button className="border-solid border-black border-2 w-full m-3 h-3/5 rounded-md text-xl" onClick={handleSwap}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Register;