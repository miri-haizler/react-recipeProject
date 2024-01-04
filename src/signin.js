import { useState, useParams } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import img from './images/image17.jpg'

const schema = yup.object({
  Username: yup.string().required(),
  Password: yup.string().required(),
  Phone: yup.string().required(),
  Tz: yup.string().required(),
  Name: yup.string().required(),
  Email: yup.string().matches(/[a-z]+@+/, 'Is not in correct format').required(),
}).required();


export default function Sign() {

  const dispatch = useDispatch()
  const { state: { Password, Username } } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    values: { Password, Username }
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/api/user/sighin", data)
      .then(response => {
        dispatch({ type: "SET_USER", data: response.data })
        axios.get("http://localhost:8080/api/recipe")
          .then(response => {
            //setUserData(response.data);
            dispatch({ type: 'GET_RECIPES', data: response.data });
          })
          .catch(error => {
            console.error(error);
          });
           axios.get("http://localhost:8080/api/category")
          .then(response => {
              //setUserData(response.data);
              console.log(response.data)
              dispatch({ type: "GET_CATEGORIES", data: response.data });
          })
          .catch(error => {
              console.error(error);
          });
        console.log(response.data); // Do something with the response data
      })
      .catch(error => {
        // Handle error response
        if (error.response && error.response.data) {
          const errorMessage = error.response.data;
          console.log(errorMessage);
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
      <form class="card border-primary mb-3" onSubmit={handleSubmit(onSubmit)}>

        <input {...register("Username")} placeholder="שם משתמש" />
        <p>{errors.title?.message}</p>
        <input {...register("Password")} placeholder="סיסמה" />
        <p>{errors.body?.message}</p>
        <input {...register("Phone")} placeholder="פלאפון" />
        <p>{errors.body?.message}</p>
        <input {...register("Tz")} placeholder="תעודת זהות" />
        <p>{errors.body?.message}</p>
        <input {...register("Email")} placeholder="מייל" />
        <p>{errors.body?.message}</p>
        <input {...register("Name")} placeholder="שם" />
        <p>{errors.body?.message}</p>

        <input type="submit" class="btn btn-primarye"  value={"התחברות"} />
      </form>
      
    </div>);
      }
