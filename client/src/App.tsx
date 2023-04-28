import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Login  from "./loginPage";
import Register from "./registrationPage";
import Home from "./homePage";
import MyRecipesMenu from './MyRecipesMenu';

function App() {
  // const [page, setPage] = useState('Login');
  const [background, setBackground] = useState('');
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/' || location.pathname === '/Register'){
      setBackground('LoginAndRegistration');
    } else if(location.pathname === '/Home'){
      setBackground('LoginAndRegistration');
    }
  }, [location.pathname])

  return (
    <div className={'App ' + background }>
      {/* <Login/> */}
      <Routes>
        <Route path="Home" element={<Home />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
        <Route path="MyRecipes" element={<MyRecipesMenu />}></Route>
      </Routes>
    </div>
  );
}

export default App;
