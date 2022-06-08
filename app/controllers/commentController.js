const Comment = require('../models/comment');

const commentController = {

    create : async(request, response) => {
        try{
            const comments = await Comment.findAll();
            response.status(200).json({comments});
        } catch(err){
            console.error(err);
        }
    },
}

module.exports = commentController ;