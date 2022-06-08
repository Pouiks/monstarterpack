const Category = require('../models/category');

const categoryController = {

    create : async(request, response) => {
        try{
            const categories = await Category.findAll();
            response.status(200).json({categories});
        } catch(err){
            console.error(err);
        }
    },
}

module.exports = categoryController ;