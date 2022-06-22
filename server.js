let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

const recipes = [
	{
		title: 'Fruit Salad',
		difficulty: '2',
		ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
		calories: "200",
		instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
		recipeID: 1,
	}, {
		title: 'Avocado Wrap',
		difficulty: '3',
		ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
		calories: "400",
		instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
		recipeID: 2
	},
];


app.post('/api/loadRecipes', (req, res) => {
	let string = JSON.stringify(recipes);
	console.log(string);
	res.send({ express: string });
});

app.post('/api/findRecipe', (req, res) => {
	let ingredientSearchTerm = req.body.ingredientSearchTerm;
	let calorieSearchTerm = req.body.calorieSearchTerm;
	console.log("ingredientSearchTerm: ", ingredientSearchTerm);
	console.log("calorieSearchTerm: ", calorieSearchTerm);

	const foundRecipesByIngredients = recipes.filter(function (recipe) {
		if (ingredientSearchTerm) {
			console.log('Filtered by: ', ingredientSearchTerm);
			return recipe.ingredients.includes(ingredientSearchTerm);
		} else {
			return recipe;
		}
	});

	const foundRecipesByCalorie = foundRecipesByIngredients.filter(function (recipe) {
		if (calorieSearchTerm) {
		  return parseInt(recipe.calories) <= parseInt(calorieSearchTerm);
		} else {
		  return recipe;
		}
	  });

	let string = JSON.stringify(foundRecipesByCalorie);
	console.log(string);
	//let obj = JSON.parse(string);
	res.send({ express: string });
});

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	console.log("UserID: ", userID);

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/findRecipeByCalories', (req, res) => {
	let calorieSearchTerm = req.body.calorieSearchTerm;
	console.log("calorieSearchTerm: ", calorieSearchTerm);

	const foundRecipesByCalorie = recipes.filter(function (recipe) {
		if (calorieSearchTerm) {
		  return parseInt(recipe.calories) <= parseInt(calorieSearchTerm);
		} else {
		  return recipe;
		}
	  });

	let string = JSON.stringify(foundRecipesByCalorie);
	console.log(string);
	//let obj = JSON.parse(string);
	res.send({ express: string });
})



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(3000, '129.97.25.211'); //for the deployed version, specify the IP address of the server
