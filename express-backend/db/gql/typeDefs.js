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
    }

    type Ingredient {
        id: ID
        name: String
        protein: Int
        fat: Int
        carb: Int
        calories: Int
    }

    type Recipe {
        id: ID
        name: String
        pic: String,
        ingredients: [Ingredient]
    }

    type Mutation {
        addIngredient(
            name: String
            protein: Int
            fat: Int
            carb: Int
            calories: Int
        ): Ingredient
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