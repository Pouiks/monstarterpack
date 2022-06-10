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
            const articleId = request.body.id;
            const article = await Article.findOne(articleId);
            if(!article){
                response.status(500).json('Article not found');
            } else {
                response.status(200).json({article});
            }
        } catch (error) {
            console.error(error);
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
            const article = request.body.id;
            await Article.delete(article);
            response.status(200).json(`Article ${id} has been delete`);
        } catch (error) {
            console.log(error);
        }
    },

    setOffLine: async(request, response) => {
        try {
            const id = request.body.id;
            const article = Article.setOffline(id);
            response.status(200).json(`Value modified to ${article.is_online}`, {article});
        } catch (error) {
            console.error(error);
        }
    },

    setOnLine: async(request, response) => {
        try {
            const id = request.body.id;
            const article = Article.setOnline(id);
            response.status(200).json(`Value modified to ${article.is_online}`, {article});
        } catch (error) {
            console.error(error);
        }
    }
}

export default articleController ;