import React from 'react'
import { Link } from 'react-router-dom'
import MealsBlockContainer from "./meal"
import MyRecipesMenu from "./MyRecipesMenu"

const Home = () => {
    return (
        <div className='flex flex-col bg-white w-4/5 h-4/5 rounded-md shadow-xl'>
            <div className='flex h-1/8 w-full border-b-2 border-grey-600 text-4xl p-1 rounded-t-md justify-center bg-rose-400'>TomoMacro</div>
            <div className='flex h-full w-full'>
                <MyRecipesMenu></MyRecipesMenu>
                <MealsBlockContainer></MealsBlockContainer>
            </div>
            
        </div>
    );
}

export default Home;