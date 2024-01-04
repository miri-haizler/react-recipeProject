
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { Fragment } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import img from './images/image17.jpg'
// import Button from '@mui/material-next/Button';
// import SendIcon from '@mui/icons-material/Send';
// import { Input } from '@mui/base/Input';
// import '../style.css'

const schema = yup.object({
  Name: yup.string().required(),
  Id: yup.string().required(),

}).required();

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const naving = useNavigate();

  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/category', data)
      .then(res => {
        dispatch({ type: "ADD_CATEGORY", payload: res.data })
        console.log("nnnkkkk");
        naving('/recipes')
      })
      .catch(err => {
        console.error(err)
        alert(err.response.data)
      })
  }

  return <Fragment>
<div style={{
     backgroundImage:`url(${img})`,
     backgroundSize:'cover',
     backgroundPosition:'center',
     height:"100vh",
     width:"100vw",

   }}></div>
    {/* <h2>Add-Category</h2> */}
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Name</label>
      <input {...register("Name")} placeholder="enter name category" />
      <p>{errors.Name?.message}</p>
      <label>Id</label>
      <input {...register("Id")} placeholder="enter id category" />
      <p>{errors.Id?.message}</p>
      <button type="submit" style={{ backgroundColor: "gray" }} variant="contained"  >  Send
      </button>
      
    </form>

  </Fragment>
}