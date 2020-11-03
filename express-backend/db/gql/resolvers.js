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
    User: {
        categories: (parent, args) => {
            return Category.find({ email: parent.email});
        }
    },
    Mutation: {
        addCategory: async (parent, args) => {
            const newCategory = await new Category({
                email: args.email,
                name: args.name,
            }).save();
            return newCategory;
        },
        addIngredient: async (parent, args) => {
            const newIngredient = await new Ingredient({
                name: args.name,
                protein: args.protein,
                fat: args.fat,
                carb: args.carb, 
                calories: args.calories,
            }).save();
            return newIngredient;
        },
        addRecipe: async (parent, args) => {
            const newRecipe = await new Recipe({
              name: args.name,
            }).save();
            return newRecipe;
        },
        addRecipeToCategory: async (parent, args) => {
            const theRecipe = await Recipe.findById(args.recipe_id);
            const theCategory = await Category.findById(args.category_id)
            return theCategory;
        }
    }
};

module.exports = resolvers;