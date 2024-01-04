import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteProduct=()=>{
    
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user=useSelector(state=>state?.user.Id);
    const id=state.Id;


    axios.post(`http://localhost:8080/api/bay/delete/${user}/${id}`).then(response => {
        console.log("ooo",response.data);
         dispatch({ type: "DELETE_PRODUCT", data: state })
        
    })
        .catch(error => {
            console.error(error);
        });
    return <></>
}
export default DeleteProduct;