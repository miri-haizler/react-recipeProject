// import logo from './logo.svg';
// import './App.css';
// import { useLocation } from "react-router-dom"

import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./header";
import Login from "./login2";
import Sign from "./signin";
import HomePage from "./homePage";
import Recipes from "./recipe/recipes";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import AddRecipe from "./recipe/addRecipe";
import DeleteRecipe from "./recipe/deleteRecipe";
import ShowRecipeDetails from "./recipe/showRecipeDetails";
import Buyies from "./buyies/buyies";
import AddProduct from "./buyies/addProduct";
import DeleteProduct from "./buyies/deleteProduct";
import AddCategory from "./addCategory";

function App() {
  const user = useSelector(state => state.user)
  const navig = useNavigate()
  useEffect(() => {
    if (!user) {

      navig('/homepage')
    }
     else {
       navig('/header')
     }

  }, [user])

  return (
    <>

      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/addRecipe" element={<AddRecipe/>} />
        <Route path="/deleteRecipe" element={<DeleteRecipe/>}/>
        <Route path="/showRecipeDetails" element={<ShowRecipeDetails/>}/>
        <Route path="/buyies" element={<Buyies/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/deleteProduct" element={<DeleteProduct/>}/>
        <Route path="/addCategory" element={<AddCategory/>}/>

        
      </Routes>
    </>
  );
}

export default App;

// jsx
// <div>
//   {data.map((item) => (
//     <ChildComponent key={item.id} data={item} />
//   ))}
// </div>

