import axios from "axios";
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import DeleteRecipe from "./deleteRecipe";
import { useNavigate } from "react-router-dom"



const Recipes = () => {
    const [Categories, setCategories] = useState([]);
    const user = useSelector(state => state.user)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    useEffect(() => {
       
        axios.get('http://localhost:8080/api/category').then((c) => { setCategories(c.data) })
    }, [])
   

    // const [userData, setUserData] = useState([]); // הגדרת סטייט למידע של המשתמש
    const navigate = useNavigate()
    const recipes = useSelector(state => state.recipes)
    console.log("mmm", recipes)

    const handleCategoryChange = (event) => {
        // הפעולה הזו תתבצע כאשר משתמש בוחר אפשרות בתיבת הבחירה
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
        // ניתן להוסיף פעולות נוספות כאן לפי הצורך
    };
    const handleDurationChange = (event) => {
        const selectedDuration = event.target.value;
        setSelectedDuration(selectedDuration);
    };
    function checkDuration(recipe_duration) {
        switch (selectedDuration) {
            case "60":
                return (recipe_duration >= 60);
            case "45":
                return (recipe_duration >= 45 && recipe_duration < 60);
            case "30":
                return (recipe_duration >= 30 && recipe_duration < 45);
            case "15":
                return (recipe_duration >= 0 && recipe_duration < 30);
            default: return false;
        }
    }
    const handleDifficultyChange = (event) => {
        const selectedDifficulty = event.target.value;
        setSelectedDifficulty(selectedDifficulty);
    };
    return (<>

        {/* <img src={Image} style={{ width: 500 }}></img>
        <hr />
        <AddRecipe /> */}
<br></br>
<div id="selectIm">
   < div>
        <select class="nav-link dropdown-toggle" onChange={handleCategoryChange} value={selectedCategory || ''}>
            {Categories.map((x) =>
                <option key={x.Id} value={x.Id} >{x.Name}</option>)}
        </select>
        <p>Selected Category: {selectedCategory}</p>
        </div>
        < div>
        <select class="nav-link dropdown-toggle" onChange={handleDurationChange} value={selectedDuration || ''}>
            <option value={15} >15 minutes</option>
            <option value={30} >30 minutes</option>
            <option value={45} >45 minutes</option>
            <option value={60} >an hour and more</option>
        </select>
        <p>Selected Duration: {selectedDuration}</p>
        </div>
        < div>
        <select class="nav-link dropdown-toggle" onChange={handleDifficultyChange} value={selectedDifficulty || ''}>
            <option value={1} >easy</option>
            <option value={2} >medium</option>
            <option value={3} >hard</option>
            <option value={4} >difficulte </option>
        </select>
        <p>Selected Difficulty: {selectedDifficulty}</p>
        </div>
        </div>
        <div class="cards-container">
        {recipes.map(x => (!selectedCategory || x.CategoryId == selectedCategory) && (!selectedDuration || checkDuration(x.Duration)) && (!selectedDifficulty || selectedDifficulty == x.Difficulty) ?
            <div  class="card border-secondary mb-5"  key={x.Id}>
                <div class="card-header">{x.Name}</div> 
                <img class="card-text" src={x.Img}></img>
                {<button onClick={() => navigate(`/showRecipeDetails`, { state: x })} type="button" > show recipe</button>}
            </div>
            : null)}
</div>
    </>);
}
export default Recipes;





