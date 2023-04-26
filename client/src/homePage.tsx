import React from 'react'
import { Link } from 'react-router-dom'
import MealsBlockContainer from "./meal"
import MyRecipesMenu from "./MyRecipesMenu"

const Home = () => {
    return (
        <div className='flex flex-col bg-white'>
            <div>home page</div>
            <MyRecipesMenu></MyRecipesMenu>
            <MealsBlockContainer></MealsBlockContainer>
            
        </div>
    );
}

export default Home;