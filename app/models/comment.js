import db from '../database';

class Comment {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll() {
        const comments = await db.query(`
            SELECT * FROM "comment" ;
        `);
        return comments.rows;
    };
    
};

export default Comment;