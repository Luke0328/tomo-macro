import React from 'react'
import { Link } from 'react-router-dom'
import MealsBlockContainer from "./meal"

const Home = () => {
    return (
        <>
        {/* <div>home page</div> */}
        <MealsBlockContainer></MealsBlockContainer>
        {/* <AddFoodButton></AddFoodButton> */}
        {/* <Link to="/Login">Login</Link> */}
        </>
    );
}

export default Home;