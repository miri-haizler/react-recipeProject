import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const DeleteRecipe = () => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    axios.post(`http://localhost:8080/api/recipe/delete/${state}`).then(response => {
        dispatch({ type: "DELETE_RECIPIES", data: state })
        navigate(`/recipes`)
    })
        .catch(error => {
            console.error(error);
        });
    return <></>
}
export default DeleteRecipe;