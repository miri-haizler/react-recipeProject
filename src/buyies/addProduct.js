
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import img from '../images/image17.jpg'
import { useNavigate } from "react-router-dom"


const AddProduct = () => {

    const UserId = useSelector(state => state.user?.Id)
    const { state } = useLocation();
    const dispatch=useDispatch()
    const selectProduct = state;
    const Name = selectProduct?.Name;
    const Count = selectProduct?.Count;
    const id=selectProduct?.Id;
    const navigate = useNavigate()
    const schema = yup.object({
        // Id: yup.number().required(),
        Name: yup.string().required(),
        Count: yup.number().required(),
        UserId: yup.number().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: { UserId, Name, Count}
    });

    const onSubmit = (data) => {
        console.log(data);
        if (selectProduct) {
            axios.post("http://localhost:8080/api/bay",data).then(response => {
                console.log(response.data,"ppp")
                dispatch({type:"DELETE_PRODUCT",data:response.data.Id})
                dispatch({type:"ADD_PRODUCT",data:response.data})
                navigate('/header')
            })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            axios.post(`http://localhost:8080/api/bay`, data).then(response => {
                console.log(response.data)
                dispatch({type:"ADD_PRODUCT",data:response.data})
                navigate('/header')
            })
                .catch(error => {
                    console.error(error);
                });
        }

    }
    return (
<div style={{
      backgroundImage:`url(${img})`,
      backgroundSize:'cover',
      backgroundPosition:'center',
      height:"100vh",
      width:"100vw",

   }}>
        <form   id="form" class="card border-primary mb-3" onSubmit={handleSubmit(onSubmit)}>
            {/* {Object.entries(errors).map(([fieldName, error]) => (
                <p key={fieldName}>{error.message}</p>
            ))} */}
            {/* <input {...register("Id")} placeholder="product id" value={state?.Id} />
            <p>{errors.title?.message}</p> */}
            <input {...register("Name")} placeholder="product name" />
            <p>{errors.body?.message}</p>
            <input {...register("Count")} placeholder="count" />
            <p>{errors.body?.message}</p>
            <input {...register("UserId")} placeholder="user Id" value={selectProduct?.UserId} />
            <p>{errors.body?.message}</p>
            {/* {selectProduct? <input {...register("Id")} value={selectProduct?.Id} />  : null} */}
            <input type="submit" value={"send"} />
        </form >
  </div>  );
    
}
export default AddProduct;