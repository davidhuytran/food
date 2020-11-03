const { gql } = require("apollo-server-express");
require("graphql-type-json");

const typeDefs = gql`
    scalar JSON
    scalar JSONObject

    type User {
        id: ID
        email: String
        password: String
        recipes: [Recipe]
        categories: [Category]
    }

    type Category {
        id: ID
        name: String
        user: User
    }

    type Recipe {
        id: ID
        name: String
        pic: String,
        ingredients: [Ingredient]
        categories: [Category]
    }

    type Ingredient {
        id: ID
        name: String
        protein: Int
        fat: Int
        carb: Int
        calories: Int
    }

    type Mutation {
        addCategory(email: String, name: String): Category
        addIngredient(
            name: String
            protein: Int
            fat: Int
            carb: Int
            calories: Int
        ): Ingredient
        addRecipe(name: String): Recipe
        addRecipeToCategory(category_id: ID, recipe_id: ID) : Category
    }

    type Query {
        users: [User]
        user(email: String): User
        categories: [Category]
        category(id: ID): Category
        recipes: [Recipe]
        recipe(id: ID): Recipe
        ingredients: [Ingredient]
        ingredient(id: ID): Ingredient
    }
    

`

module.exports = typeDefs;