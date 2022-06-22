/*
Q1: Programmatically create a stateful list "ingredients" from the list "recipes" upon the first render of the app.
    Specifically, do the following:
    A. Define a stateful list "ingredients" and corresponding state updater function "setIngredients";
    B. Create a React.useEffect() hook, calling the function createIngredientsList() upon the first render;
    C. Complete the function createIngredientsList() to build a list of ingredients from all recipes 
       by implementing the following logic:
        - within the scope of the function define "allIngredients" list
        - iterate through the list of recipes and
        - for each recipe, iterate through the list of ingredients, adding each ingredient to "allIngredients" list;
        - update the stateful list "ingredients", setting it to "allIngredients" list.


Q2. Modify the code to display the list of ingredients, instead of recipes.

Q3: Implement addition of a new ingredient to the stateful list "ingredients" by completing the function:
    handleAddNewItem()

*/

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

const App = () => {

    const [ingredients, setIngredients] = React.useState([]);

    React.useEffect(() => {
        createIngredientsList();
      }, []);

    const recipes = [
        {
            title: 'Fruit salad',
            difficulty: '2',
            ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
            calories: "200",
            instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
            recipeID: 1,
        }, {
            title: 'Avocado wrap',
            difficulty: '3',
            ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
            calories: "400",
            instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
            recipeID: 2
        },
    ];



    const createIngredientsList = () => {
        var allIngredients = [];
        for (var i = 0; i < recipes.length; i++) {
            var recipeIngredients = recipes[i].ingredients;
            for (var j = 0; j < recipeIngredients.length; j++) {
                allIngredients.push(recipeIngredients[j]);
            }
        }
        setIngredients(allIngredients);
    }



    const handleAddNewItem = (item) => {
        var ingredientsCopy = [...ingredients]; // shallow copy
        ingredientsCopy.push(item);
        setIngredients(ingredientsCopy);
    }



    return (
        <div>
            <h1>
                Recipes
            </h1>


            <List
                list={ingredients}

            />

            <AddNewItem
                onAdd={handleAddNewItem}
            />

        </div>
    );
}


const AddNewItem = ({ onAdd }) => {
    const [newItem, setNewItem] = React.useState('');

    const onEditNewItem = (event) => {
        setNewItem(event.target.value);
    }
    const onSaveNewItem = () => {
        onAdd(newItem);
    }

    return (
        <div>
            <TextField
                required
                id='add'
                onChange={onEditNewItem}
                value={newItem}
            />
            <Button
                variant="contained"
                onClick={onSaveNewItem}
            >
                Add
            </Button>
        </div>
    )
}

const List = ({ list }) => {
    return (
        <ul>
            {list.map((item) => {
                return (
                    <Item
                        item={item}

                    />
                );
            })}
        </ul>

    )
}

const Item = ({ item }) => {


    return (
        <li>
            <p>{item}</p>
        </li>
    )
}


export default App;