const { User, Recipe, Ingredient, Category } = require("../models");

const resolvers = {
    Query: {
        users: () => User.find(),
        user: (parent, args) => User.findOne({ email: args.email }),
        categories: () => Category.find(),
        category: (parent, args) => Category.findOne({ id: args.id }), 
        recipes: () => Recipe.find(),
        recipe: (parent, args) => Recipe.findById(args.id),
        ingredients: () => Ingredient.find(),
        ingredient: (parent, args) => Ingredient.findById(args.id),
    },
    Mutation: {
        addIngredient: async (parent, args) => {
            const newIngredient = await new Ingredient({
                name: args.name,
                protein: args.protein,
                fat: args.fat,
                carb: args.carb, 
                calories: args.calories,
            }).save();
        }
    }
}

module.exports = resolvers;