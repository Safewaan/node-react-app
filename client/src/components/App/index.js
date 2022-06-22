import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
//import BackgroundImage from "./backgroundImage.jpg"

const serverURL = "";

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});


const RecipePaper = styled(Paper)(({ theme }) => ({
  opacity: 0.7,
  backgroundColor: theme.palette.primary.background,
  padding: 8,
  borderRadius: 4,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

const App = () => {

  const [expandedRecipesList, setExpandedRecipesList] = React.useState([]);
  const [recipesList, setRecipesList] = React.useState([]);
  const [editedItem, setEditedItem] = React.useState('');
  const [ingredientSearchTerm, setIngredientSearchTerm] = React.useState('');
  const [calorieSearchTerm, setCalorieSearchTerm] = React.useState('');

  React.useEffect(() => {
    loadRecipes();
  }, []);

  React.useEffect(() => {
    handleCalorieSearch();
  }, [ingredientSearchTerm, calorieSearchTerm]);

  const handleToggleIngredients = (item) => {
    var expandedRecipesListCopy = [...expandedRecipesList];
    if (expandedRecipesList.includes(item.recipeID)) {
      var index = expandedRecipesList.indexOf(item.recipeID);
      expandedRecipesListCopy.splice(index, 1);
      setExpandedRecipesList(expandedRecipesListCopy);
      console.log('expandedRecipesList: ', expandedRecipesList);
    } else {
      expandedRecipesListCopy.push(item.recipeID);
      setExpandedRecipesList(expandedRecipesListCopy);
      console.log('expandedRecipesList: ', expandedRecipesList);
    }
  }

  const handleEditInstructions = (item) => {
    setEditedItem(item.recipeID);
  }

  const handleUpdateInstructions = (index, instructions) => {
    console.log("ID: ", index);
    var recipesListCopy = recipesList;
    recipesListCopy[index].instructions = instructions;
    setRecipesList(recipesListCopy);
    setEditedItem('');
  }

  const loadRecipes = () => {
    callApiLoadRecipes()
      .then(res => {
        console.log("callApiLoadRecipes returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadRecipes parsed: ", parsed);
        setRecipesList(parsed);
      })
  }

  const callApiLoadRecipes = async () => {
    const url = serverURL + "/api/loadRecipes";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  const handleRecipeSearch = () => {
    callApiFindRecipe()
      .then(res => {
        console.log("callApiFindRecipe returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiFindRecipe parsed: ", parsed[0])
        setRecipesList(parsed);
      });
  }

  // MY WORK
  const handleCalorieSearch = () => {
    callApiFindRecipeByCalories()
    .then(res => {
      console.log("callApiFindRecipeByCalories returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiFindRecipe parsed: ", parsed[0])
      setRecipesList(parsed);
    })
  }

  const callApiFindRecipe = async () => {

    const url = serverURL + "/api/findRecipe";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        ingredientSearchTerm: ingredientSearchTerm,
        calorieSearchTerm: calorieSearchTerm
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found recipes: ", body);
    return body;
  }

  
  // MY WORK
  const callApiFindRecipeByCalories = async () => {
    const url = serverURL + "/api/findRecipeByCalories";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        calorieSearchTerm: calorieSearchTerm
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found recipes by calories: ", body);
    return body;
  }


  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          height: '100vh',
          opacity: opacityValue,
          overflow: "hidden",
          //backgroundColor: lightTheme.palette.background.default,
          //backgroundImage: `url(${BackgroundImage})`,
          backgroundImage: `url(https://ov-research.uwaterloo.ca/salad.jpg)`,
          backgroundSize: "cover"
        }}
      >
        <MainGridContainer
          container
          spacing={1}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Typography variant="h3" gutterBottom component="div">
            Recipe Finder
          </Typography>

          <Search
            label="Search by ingredient"
            onSearch={setIngredientSearchTerm}
          />

          <Search
            label="Search by calories"
            onSearch={setCalorieSearchTerm}
          />


          <List
            recipesList={recipesList}
            expandedRecipesList={expandedRecipesList}
            onToggleIngredients={handleToggleIngredients}
            onEditInstructions={handleEditInstructions}
            onUpdateInstructions={handleUpdateInstructions}
            editedItem={editedItem}
          />

        </MainGridContainer>
      </Box>
    </ThemeProvider>
  );
}

const Search = ({ label, onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  }


  return (
    <TextField
      id="search"
      label={label}
      value={searchTerm}
      onChange={(event) => onChangeSearchTerm(event)}
      variant="standard"
      autoComplete="off"
      color="secondary"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => onSearch(searchTerm)}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
};


const List = ({ recipesList, expandedRecipesList, onToggleIngredients, onEditInstructions, onUpdateInstructions, editedItem }) => {
  return (
    <>
      {recipesList.map((item, index) => {
        return (
          <Grid item>
            <Item
              item={item}
              index={index}
              expandedRecipesList={expandedRecipesList}
              onToggleIngredients={onToggleIngredients}
              onEditInstructions={onEditInstructions}
              onUpdateInstructions={onUpdateInstructions}
              editedItem={editedItem}
            />
          </Grid>
        );
      })}
    </>

  )
}

const Item = ({ item, expandedRecipesList, onToggleIngredients, onEditInstructions, onUpdateInstructions, editedItem, index }) => {
  const [instructions, setInstructions] = React.useState(item.instructions);

  const onChangeInstructions = (event) => {
    setInstructions(event.target.value);
    //console.log(instructions);
  }

  const onApplyChanges = () => {
    onUpdateInstructions(index, instructions);
  }

  return (
    <RecipePaper>
      <Typography
        style={{ marginBottom: lightTheme.spacing(2) }}
        variant="h5"
        gutterTop
        component="div"
      >
        {item.title}
      </Typography>

      <Typography
        variant="h6"
        component="div"
        style={{ marginTop: lightTheme.spacing(1) }}
      >
        Difficulty: {item.difficulty}
      </Typography>

      {expandedRecipesList.includes(item.recipeID) && (
        <>

          <Typography variant="h6" component="div">
            Ingredients:
          </Typography>


          <ul>
            {item.ingredients.map((ingredient) => (
              <li>
                <Typography variant="body1" >
                  {ingredient}
                </Typography>
              </li>
            ))}
          </ul>

        </>
      )}


      <RecipeButton
        item={item}
        label={expandedRecipesList.includes(item.recipeID) ? 'Hide ingredients' : 'Show ingredients'}
        onButtonClick={onToggleIngredients}
      />



      <Typography
        variant="h6"
        component="div"
        style={{ marginTop: lightTheme.spacing(1) }}
      >
        Instructions:
      </Typography>

      {editedItem != item.recipeID ? (
        <>
          <Typography variant="body1" gutterBottom component="div">
            {item.instructions}
          </Typography>

          <RecipeButton
            item={item}
            label={'Edit instructions'}
            onButtonClick={onEditInstructions}
          />
        </>
      ) : (
        <>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item>
              <TextField
                required
                id='edit'
                onChange={onChangeInstructions}
                value={instructions}
                style={{ width: 600, marginBottom: lightTheme.spacing(2) }}
                multiline
              />
            </Grid>
            <Grid item>
              <RecipeButton
                item={item}
                label={'Save'}
                onButtonClick={onApplyChanges}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Typography
        variant="h6"
        gutterBottom
        component="div"
        style={{ marginTop: lightTheme.spacing(1) }}
      >
        Calories: {item.calories}
      </Typography>

    </RecipePaper>
  )
}

const RecipeButton = ({ item, label, onButtonClick }) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={(event) => onButtonClick(item, event)}
  >
    {label}
  </Button>
)


export default App;