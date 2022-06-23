import Comment from '../models/comment';

const commentController = {

    findAllComments : async(request, response) => {
        try{
            const comments = await Article.findAll();
            response.status(200).json({articles});
        } catch(err){
            console.error(err);
        }
    },

    findOneComment: async(request, response) => {
        try {
            const commentId = request.params.id;
            const comment = await Comment.findOne(commentId);
            if(!comment || []){
                response.status(400).json('Article not found');
            } else {
                response.status(200).json({comment});
            }
        } catch (error) {
            console.error(error);
        }
    },

    findCommentByArticle: async (request, response) => {
        try{
            const id = request.params.id;
            console.log(id);

            const articleComments = await Comment.getComments(id);
            console.log(articleComments);
            response.status(200).json({articleComments});
        }catch(error){
            console.log(error);
            response.status(500).send("COmments not found");

        }
    },

    createComment: async(request, response) => {
        try{
            const data = request.body;
            console.log(data);
            Comment.create({
                content: data.content,
                user_id: data.user_id,
                article_id: data.article_id
            })
            response.status(200).send(`Comment created `);
        } catch (error){
            console.error(error);
        }
    },

    deleteComment: async(request, response) => {
        try {
            const id = request.params.id;
            console.log(id);
            await Comment.delete(id);
            response.status(200).json(`Comment ${id} has been delete`);
        } catch (error) {
            console.log(error);
        }
    },


}

export default commentController ;