import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from "@mui/material";
import { } from './bootstrap.min.css';
import axios from "axios";
import img from './images/image17.jpg'

const schema = yup.object({
    Username: yup.string().required(),
    Password: yup.string().required(),//.matches(/[a-z]+/, 'Is not in correct format').required(),
}).required();


const Login = () => {

    const dispatc = useDispatch();
    const recicpes = useSelector(state => state.recicpes)
    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {

        axios.post("http://localhost:8080/api/user/login", data)
            .then(
                response => {
                    dispatc({ type: "SET_USER", data: response.data })

                    axios.get("http://localhost:8080/api/recipe")
                        .then(response => {
                            //setUserData(response.data);
                            console.log(response.data)
                            dispatc({ type: "GET_RECIPES", data: response.data });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    console.log(response.data); // Do something with the response data

                    axios.get("http://localhost:8080/api/category")
                        .then(response => {
                            //setUserData(response.data);
                            console.log(response.data)
                            dispatc({ type: "GET_CATEGORIES", data: response.data });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                })
            .catch(error => {
                // Handle error response
                if (error.response && error.response.data) {
                    //const errorMessage = error.response.data;
                    //console.log(errorMessage);
                    console.log("in")
                    navigate(`/sign`, { state: { ...data } })
                    // navig("/sigin",{data})
                }
            })
    }


    return (
<div style={{
     backgroundImage:`url(${img})`,
     backgroundSize:'cover',
     backgroundPosition:'center',
     height:"100vh",
     width:"100vw",

   }}>
        <form class="card border-primary mb-3"  onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label for="exampleTextarea" class="form-label mt-4">User Name</label>
                <input {...register("Username")} class="form-control" id="exampleTextarea" rows="1" />
                <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                <input {...register("Password")} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="off" />

                <button type="submit" class="btn btn-primarye" value="submit">Submit</button>
            </div>
        </form >

        {/* // <form onSubmit={handleSubmit(onSubmit)}>


        //     <input {...register("Username")} id="standard-basic" label="Standard" variant="Standard" placeholder="שם משתמש" />
        //     <p>{errors.title?.message}</p>
        //     <input {...register("Password")} placeholder="סיסמה" />
        //     <p>{errors.body?.message}</p>
        //     <input type="submit" value={"הרשמה"} />

        // </form> */}

 </div>   );
    
}
export default Login;