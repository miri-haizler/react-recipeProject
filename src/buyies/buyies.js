import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import img from '../images/image17.jpg'

const Buyies = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.Id)
    const myBuyies = useSelector(state => state?.buyies);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/bay/${user}`)
            .then(response => {
                //console.log(response.data)
                dispatch({ type: 'GET_BUYIES', data: response.data });
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return <div style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "100vh",
        width: "100vw",
       

    }}>

        
            <div class="card border-primary mb-4">
                {myBuyies?.map((x) => (
                    <div id="Showproduct" key={x.Id}>

                        {x.Count}
                        {x.Name}
                        <br></br>

                        {<button onClick={() => navigate(`/addProduct`, { state: x })} type="button">update product</button>}
                        {<button onClick={() => navigate(`/deleteProduct`, { state: x })} type="button">delete product</button>}
                        <br></br>
                        <br></br>



                    </div>
                ))}
           
                <br></br>
                {<button class="btn btn-primarye" onClick={() => navigate(`/addProduct`)} type="button">add product</button>}
            </div>
      
    </div>
}

export default Buyies;