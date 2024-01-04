import { useLocation, Link } from "react-router-dom"
import React from "react";
import { Fragment } from "react";
import img from './images/image17.jpg'
const HomePage = () => {


   return <div style={{
     backgroundImage:`url(${img})`,
     backgroundSize:'cover',
     backgroundPosition:'center',
     height:"100vh",
     width:"100vw",
     
   }}>
      <div id="linkBotton">
      <Fragment>
         <Link to="/login" class="btn btn-primary"   >כניסה</Link>
         <Link to="/sign" class="btn btn-primary" state={{}}>הרשמה</Link> </Fragment>
         </div>
    </div>

}
export default HomePage;