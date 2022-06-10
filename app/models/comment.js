import db from '../database';

class Comment {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll() {
        const comments = await db.query(`
            SELECT * FROM "comment order by desc" ;
        `);
        return comments.rows;
    };


    static async findOne(commentId){
        const comment = await db.query(`
            SELECT * from "comment" WHERE "id" = $1;
        ` [commentId]);
        return comment.rows;
    };

    static async create(comment){
        const newComment= await db.query(`
            INSERT INTO "comment" ("title", "content", "user_id", "article_id") VALUES ( $1, $2, $3, $4);
        `, [
            comment.title,
            comment.content,
            comment.user_id,
            comment.article_id
        ]);
    };

    static async delete(commentId){
        const comment = await db.query(`
            DELETE from "comment" WHERE "id" = $1
        `, [commentId]);
    };

    
};

export default Comment;