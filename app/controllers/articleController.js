import Article from '../models/article';

const articleController = {

    findAllArticles : async(request, response) => {
        try{
            const articles = await Article.findAll();
            response.status(200).json({articles});
        } catch(err){
            console.error(err);
        }
    },

    findOneArticle: async(request, response) => {
        try {
            const articleId = request.params.id;
            const article = await Article.findOne(articleId);
            
                response.status(200).json({article});
            
        } catch (error) {
            console.error(error);
        }
    },

    byCategory: async(request, response) => {
        try {
            const id = request.params.id;
            const articles = await Article.getArticlesByCategory(id);
            if(!articles){
                response.status(500).json('An error occured');
            } else {
                response.status(200).json({articles});
            }
        } catch (error) {
            console.error(error);
            response.status(400).json('category not found');
        }
    },

    createArticle: async(request, response) => {
        try{
            const data = request.body;
            Article.create({
                title: data.title,
                content: data.content,
                description: data.description,
                category_id: data.category_id

            });
            response.status(200).json(` Article ${data.title} was created, but he is OFFLINE`);
        } catch (error){
            console.error(error);
            response.status(500).json('Error occured');

        }
    },

    deleteArticle: async(request, response) => {
        try {
            const id = request.body.id;
            await Article.delete(id);
            response.status(200).json(`Article ${id} has been delete`);
        } catch (error) {
            console.log(error);
        }
    },

    setOffLine: async(request, response) => {
        try {
            const id = request.params.id;
            const article = Article.setOffline(id);
            response.status(200).json(`Value modified to ${article.is_online}`);
        } catch (error) {
            console.error(error);
        }
    },

    setOnLine: async(request, response) => {
        try {
            const id = request.params.id;
            console.log(id);
            const article = Article.setOnline(id);
            response.status(200).json(`Value modified to ${article.is_online}`);
        } catch (error) {
            console.error(error);
            response.status(400).json(error);
        }
    },

    addLike: async(request, response) =>{
        try {
            const id = request.params.id;
            const article = await Article.increment(id);
            response.status(200).json(`Article ${id} has been incremented`);
            
        } catch (error) {
            console.error(error);
            response.status(400).json('Value not incremented');
        }
    },
    removeLike: async(request, response) =>{
        try {
            const id = request.params.id;
            const article = await Article.decrement(id);
            response.status(200).json(`Article ${id} has been decremented`);
            
        } catch (error) {
            console.error(error);
            response.status(400).json('Value not decremented');
        }
    },
}

export default articleController ;