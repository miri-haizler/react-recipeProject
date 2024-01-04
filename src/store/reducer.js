import axios from 'axios';
import { useEffect } from 'react';
import * as actionsName from './action'

const initalState = {
    recipes: [],
    user: null,
    UserId: null,
    categorys: [],
    buyies: [],
    buyProduct: []
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case "GET_RECIPES":
            {
                return { ...state, recipes: action.data }
            }
        case "UPDATE_RECIPIES":
            {
                const recipe = action.data;
                console.log("recipe", recipe)
                state.recipes[recipe.Id - 1] = recipe;
                console.log(state.recipes[recipe.Id], "ooo")
                // const findRecipe = state.recipes?.findIndex(p => p.id == product.Id)
                // state.recipes = filtered;
                return {
                    ...state
                }
            }
        case "ADD_RECIPE":
            {
                const recipe = action.data;
                console.log("dddd", recipe);
                state.recipes = [...state.recipes, recipe]
                console.log("kkk", state.recipes);
                return { ...state }
            }
        case "ADD_PRODUCT":
            {
                const product = action.data;
                console.log(product, "lll")
                const findProduct = state.buyies?.findIndex(p => p.Name == product.Name)
                console.log("gggg", findProduct)
                findProduct ? (state[findProduct].Count) += (product.Count) :
                    state.buyies = [...state.buyies, product]

                return { ...state, buyies: action.data }
            }

        case "SET_USER":
            {
                return { ...state, user: action.data }
            }
        case "DELETE_RECIPIES":
            {
                const id = action.data;
                console.log(id)
                const filtered = state.recipes.filter((recipe) => recipe.Id != id)
                state.recipes = filtered;
                return {
                    ...state,
                    filtered
                }
            }

        case "DELETE_PRODUCT":
            {
                const id = action.data;
                console.log(id)
                const filtered = state.recipes.filter((recipe) => recipe.Id != id)
                state.buyies = filtered;
                return {
                    ...state,
                    filtered
                }
            }

        case "GET_CATEGORY":
            {
                return { ...state, categorys: action.data }
            }
        case "GET_BUYIES":
            {
                return { ...state, buyies: action.data }
            }
        case "SET_RECIPE":
            {
                return { ...state, recipes: action.data }
            }
        case "ADD_CATEGORY":
            {
                const category = action.data;
                console.log("dddd", category);
                state.categorys = [...state.categorys, category]
                console.log("kkk", state.categorys);
                return { ...state }
         
            }
            case "GET_CATEGORIES":
                {
                return { ...state, categorys: action.data }

                }

        default: return { ...state }
    }
}

export default reducer;