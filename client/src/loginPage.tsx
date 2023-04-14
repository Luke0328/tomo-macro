import React from 'react'


const Login = () => {
    return (
        
        <div className="flex flex-col w-2/5 h-2/5 rounded border-2 border-solid border-black items-center"> 
            <h3>Welcome to TomoMacro!</h3>
            <form className="w-full flex flex-col justify-center items-center">
                {/* <label htmlFor="email">Email</label> */}
            
                <div className="flex flex-col justify-center items-center w-full">
                    <input type="email" placeholder="youremail@gmail.com" id="email" name="email" className="w-4/5"/>
                    <input type="password" placeholder="Password" id="password" name="password" className="w-4/5"/>
                </div>

                <div className="flex justify-around w-full">
                    <button>Login</button>
                    <button>Register</button>
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