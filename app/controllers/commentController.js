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
            const commentId = request.body.id;
            const comment = await Comment.findOne(commentId);
            if(!article){
                response.status(500).json('Article not found');
            } else {
                response.status(200).json({comment});
            }
        } catch (error) {
            console.error(error);
        }
    },

    createComment: async(request, response) => {
        try{
            
            const comment = new Comment(request.body);
            comment.create({
                title: request.body.title,
                content: request.body.content
            })
            response.status(200).json(`Comment created : ${comment}`);
        } catch (error){
            console.error(error);
        }
    },

    deleteComment: async(request, response) => {
        try {
            const comment = request.body.id;
            await Comment.delete(comment);
            response.status(200).json(`Article ${id} has been delete`);
        } catch (error) {
            console.log(error);
        }
    },


}

export default commentController ;