import { Fragment } from "react";
import { useLocation, Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import img from './images/image17.jpg'
import React from 'react';



const Header = () => {

  const user = useSelector(state => state.user)
  const location = useLocation();
  const isHeaderPath = location.pathname === '/header';
  return <Fragment>
    {user ? <Fragment>

      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
          <Link to="header" class="navbar-brand"> Home Page</Link>
          <Link to="/recipes" class="navbar-brand">Show Recipes</Link>
          <Link to="/addRecipe" class="navbar-brand">Add Recipe </Link>
          <Link to="/addCategory" class="navbar-brand">Add Category </Link>
      
          <Link to="/buyies" class="navbar-brand"> Shopping Cart </Link>
        </div>
      </nav>

      {(isHeaderPath) ?
        <div style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: "100vh",
          width: "100vw",
          color: "black",
        }}> <div id="s" > Welcome {user.Name}
          </div>
          
        </div>
        : <></>
}

    
  </Fragment > : <></>
}
    </Fragment > 
}
export default Header;

