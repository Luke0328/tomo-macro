import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login  from "./loginPage"
import Register from "./registrationPage"
import Home from "./homePage"

function App() {
  const [page, setPage] = useState('Login');

  return (
    <div className="App">
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
