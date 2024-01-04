import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BroadcastOnPersonalRounded } from "@mui/icons-material";
import img from '../images/image17.jpg'
// import { TextField } from "@mui/material";



const AddRecipe = () => {

    const schema = yup.object({
        Name: yup.string().required(),
        CategoryId: yup.number().required(),
        Img: yup.string().required(),
        UserId: yup.number().required(),
        Duration: yup.number().required(),
        Difficulty: yup.number().required(),
        Description: yup.string().required(),
        Instructions: yup.array().of(yup.string()).required(),
        Ingrident: yup.array().of(yup.object({
            Name: yup.string().required(),
            Count: yup.number().required(),
            Type: yup.string().required(),
        })).required(),

    }).required();

    const categories = useSelector(state => state.categorys)
    console.log("categories",categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resipes = useSelector(state => state.recipes);
    const UserId = useSelector(state => state.user?.Id)
    const { state } = useLocation()
    const selectRecipe = state;
    const Name = state?.Name;
    const Img = state?.Img;
    const Duration = state?.Duration;
    const Difficulty = state?.Difficulty;
    const Description = state?.Description;
    const CategoryId = state?.CategoryId;
    const Id = state?.Id;
    // const UserId=state?.UserId;

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: { UserId, Name, CategoryId, Img, Duration, Difficulty, Description }
    });

    const { fields: Instructions, append: appendInstructions } = useFieldArray({
        control,
        name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngrident } = useFieldArray({
        control,
        name: "Ingrident"
    });

    const onSubmit = (data) => {
        if (selectRecipe) {

            axios.post("http://localhost:8080/api/recipe/edit", data).then(response => {
                console.log(response.data, "kkk")

                //לעשות מחיקה ואז הוספה כי אין עדכון!!
                //לזכור לסדר את הקובץ של המורה לפי רחלי
                dispatch({ type: "UPDATE_RECIPIES", data: response.data })

                // dispatch({type:"DELETE_RECIPIES",data:response.data.Id})
                // dispatch({type:"ADD_RECIPE",data:response.data})
                navigate('/header')
            })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            axios.post("http://localhost:8080/api/recipe", data).then(response => {
                console.log("lll", response.data)
                dispatch({ type: "ADD_RECIPE", data: response.data })

                navigate(`/recipes`)

            })
                .catch(error => {
                    console.error(error);
                });
        }

    }
    return (
        <div className="background-image-container">

            <form id="form" class="card border-primary mb-3" onSubmit={handleSubmit(onSubmit)}>

                {Object.entries(errors).map(([fieldName, error]) => (
                    <p key={fieldName}>{error.message}</p>
                ))}

                <input {...register("Name")} placeholder="entere recipe name" />
                <p>{errors.title?.message}</p>
               
              
                <select {...register("CategoryId")} label="category" >
                    {console.log("mmm",categories)}
                    {categories?.map((category) => (
                        <option key={category.Id} value={category.Id}>{category.Name}</option>
                    ))}
                </select>
                {/* <input {...register("CategoryId")} placeholder="הכנס קטגוריה" />
                <p>{errors.body?.message}</p> */}
                <input {...register("Img")} placeholder="enter image" />
                <p>{errors.body?.message}</p>
                <input {...register("Duration")} placeholder="enter duration" />
                <p>{errors.body?.message}</p>
                <input {...register("Difficulty")} placeholder="enter difficulty" />
                <p>{errors.body?.message}</p>
                <input {...register("Description")} placeholder="enter descrition" />
                <p>{errors.body?.message}</p>
                <input {...register("UserId")} value={selectRecipe?.UserId} />
                <p>{errors.body?.message}</p>
                {selectRecipe ? <input {...register("Id")} value={selectRecipe?.Id} /> : null}

                <p>{errors.body?.message}</p>
                {/* </form><input type="submit" value={"הוספה"} /> */}

                <div>
                    <label >products</label>
                    {Ingrident?.map((item, index) => (
                        <div key={index}>
                            <input {...register(`Ingrident.${index}.Name`)} placeholder="enter product name" /*value={selectRecipe?.`Ingrident${index}.Name`} */ />
                            <input {...register(`Ingrident.${index}.Count`)} placeholder="enter product count" />
                            <input {...register(`Ingrident.${index}.Type`)} placeholder="enter product type" />
                        </div>
                    ))}
                </div>

                <button type="button" onClick={() => appendIngrident({ Name: "", Count: 0, Type: "" })}>add product</button>

                <div>
                    <label>Instructions</label>
                    {Instructions?.map((item, index) => (
                        <div key={index}>
                            <input {...register(`Instructions.${index}`)} placeholder="enter instructions" />
                        </div>

                    ))}
                </div>
                <button type="button" onClick={() => appendInstructions({ value: "" })}>add Instructions</button>

                <input type="submit" class="btn btn-primarye" value={"send"} />

            </form >

        </div>);
}

export default AddRecipe;