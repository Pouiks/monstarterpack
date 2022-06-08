const Article = require('../models/article');

const articleController = {

    create : async(request, response) => {
        try{
            const articles = await Article.findAll();
            response.status(200).json({articles});
        } catch(err){
            console.error(err);
        }
    },
}

module.exports = articleController ;